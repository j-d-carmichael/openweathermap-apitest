import dotenv from 'dotenv';
import ConfigHelper from 'openapi-nodegen-config-helper';

dotenv.config();

/* tslint:disable */
export default {
  // base URL (this is the fqd + the base, if required by your api)
  baseUrl: ConfigHelper.withDefault('BASE_URL', 'http://api.openweathermap.org/data/2.5'),
};
/* tslint:enable */
