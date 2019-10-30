import objectReduceByMap from 'object-reduce-by-map';
import WeatherService from '../nodegen/services/WeatherService';

describe('WeatherService.weatherGet', () => {
  let response;
  beforeAll(async () => {
    response = await WeatherService.weatherGet({
      appid: '046aafbdd4a120313c026452c1966040',
      q: 'London'
    });
  });

  it('Check status code 200', () => {
    expect(response.statusCode).toBe(200);
  });

  it('Check body response', next => {
    console.log(response.body);
    try {
      objectReduceByMap(
        response.body,
        WeatherService.weatherGetResponseFormat,
        { throwErrorOnAlien: true }
      );
      next();
    } catch (e) {
      next(e);
    }
  });
});
