import request from 'request-promise';
import HttpService from '../../lib/HttpService';
import { HttpMethodEnum } from '../enums/HttpMethodEnum';

import Weather from '../interfaces/Weather';
import WeatherGetQuery from '../interfaces/WeatherGetQuery';

class WeatherService extends HttpService {
  // weatherGet
  public weatherGet(query: WeatherGetQuery): Promise<request.Response> {
    return this.sendRequest({
      method: HttpMethodEnum.GET,
      path: 'weather',
      qs: query
    });
  }
  public weatherGetResponseFormat = {
    coord: { lon: Number, lat: Number },
    weather: [{ id: Number, main: String, description: String, icon: String }],
    base: String,
    main: {
      temp: Number,
      pressure: Number,
      humidity: Number,
      temp_min: Number,
      temp_max: Number,
      sea_level: Number,
      grnd_level: Number
    },
    visibility: Number,
    wind: { speed: Number, deg: Number },
    clouds: { all: Number },
    dt: Number,
    sys: {
      id: Number,
      type: Number,
      country: String,
      sunrise: Number,
      sunset: Number
    },
    timezone: Number,
    id: Number,
    name: String,
    cod: Number
  };
}

export default new WeatherService();
