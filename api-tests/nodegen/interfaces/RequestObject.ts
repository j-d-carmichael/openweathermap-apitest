import {HttpMethodEnum} from '../enums/HttpMethodEnum'

export interface RequestObject {
  method: HttpMethodEnum
  path: string
  params?: object
  qs?: object
  body?: object
  headers?: object
}
