import request from 'request';
import requestPromise from 'request-promise';
import config from '../config';
import { RequestObject } from '../nodegen/interfaces/RequestObject';

const urlJoin = require('url-join');

export default class HttpService {
  /**
   * Make the http requestPromise
   * @param {RequestObject} requestObject
   */
  public async sendRequest (requestObject: RequestObject): Promise<request.Response> {
    requestObject.headers = requestObject.headers || {};
    const URL = urlJoin(
            config.baseUrl,
            HttpService.injectParamsToPath(
                    requestObject.params,
                    requestObject.path,
            ),
    );
    try {
      const requestPromiseObject = {
        body: requestObject.body,
        headers: requestObject.headers,
        json: true,
        method: requestObject.method,
        qs: requestObject.qs,
        resolveWithFullResponse: true,
        url: URL,
      };
      return await requestPromise(requestPromiseObject);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Injects the values into a path
   * @param {Object} params
   * @param {String} path
   */
  private static injectParamsToPath (params: object = {}, path: string) {
    Object.keys(params).forEach((param) => {
      path = path.replace(':' + param, params[param]);
    });
    return path;
  }
}
