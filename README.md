# openapi-nodegen-typescript-api-test-rig

**Beta release**

Using [openapi-nodegen](https://www.npmjs.com/package/openapi-nodegen) this set of templates will auto-generate a fully working API test rig based on a single swagger file.

The tests use [TS-Jest](https://www.npmjs.com/package/ts-jest), a typescript port of Jest.


## Setup
- In a new directory run: `npm init`
- Add to the dev dependencies [openapi-nodegen](https://www.npmjs.com/package/openapi-nodegen)
  - run: `npm i --save-dev openapi-nodegen`
- Add the nodegen generate test rig to the `package.json` scripts object. The following will load a local swagger file `api.1.0.0.yml` and generate the test rig with the given git repository:
  ```

    "scripts": {
        "generate:nodegen:test-rig": "openapi-nodegen ./swagger/api_1.0.0.yml -t https://github.com/acrontum/openapi-nodegen-typescript-api-test-rig.git",

  ```

## Run it
Assuming the above setup steps have been successfully completed you can simply run the script you added.
Ensure you correct the name of the swagger file, the above assumes the swagger file is in a folder named "swagger" and the file named "api_1.0.0.yml".

_**Tip**: you can improve this by referencing the file from an npm package_

If you just want to get a demo up and running, copy the swagger file from [openapi-nodegen-typescript-api-test-rig](https://github.com/acrontum/openapi-nodegen-typescript-api-test-rig.git) to your local folder.

This rig relies on dotenv, this allows for simple local development by easily configuring a .env file instructing the HttpService where to talk to. To get a demo off the ground with the provided swagger file, place a `.env` file containing:
```
BASE_URL=http://dummy.restapiexample.com
```

Run the script from a command line:
```
npm run generate:nodegen:test-rig
```

This will output the test structure; test files in folder tests and the api client in folder src.
By default it will create 200 expect functions and check the basic structure of a response(see the example test below).

Before running npm the tests you must now install the new dependencies it created:
```bash
npm i
```


#### Example
"tests/EmployeesTest.spec.ts"
```typescript
import EmployeesService from '@/nodegen/services/EmployeesService';
import objectReduceByMap from 'object-reduce-by-map';

describe('EmployeesService.employeeGet', () => {
  let response;
  beforeAll(async () => {
    response = await EmployeesService.employeeGet(/* add params here */);
  });

  it('Check status code 200', () => {
    expect(response.statusCode).toBe(200);
  });

  it('Check body response', next => {
    try {
      objectReduceByMap(
        response.body,
        EmployeesService.employeeGetResponseFormat,
        { throwErrorOnAlien: true }
      );
      next();
    } catch (e) {
      // objectReduceByMap threw an error so alien attributes were discovered in the api response.
      // Calling next with the error so Jest stops.
      next(e);
    }
  });
});
```

## Configuring Jest

Configure Jest in the same way you would any other project, config data in the jest.config and pre-run setup in jest.setup.

## Regenerate with extended swagger

Assuming the developers are adhering to [documentation driven development](https://gist.github.com/zsup/9434452), the swagger will evolve and then the API will follow.

When the swagger is evolved to a new version, add the new version to your swagger folder and adjust your package json generation script.

Re-running the nodegen will not overwrite any of the tests, but it will overwrite any changes in the nodegen folder.. in otherwords all the service classes and interface files will be updated.

## Known issues
The 1st generation will overwrite `swagger/api_1.0.0.yml` with this packaged one.
It will also copy over this repos README file.

A new ignore feature in the nodegen will fix this issue, until then just be aware.
