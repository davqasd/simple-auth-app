import { AxiosResponse } from 'axios';
import cookie from 'react-cookies'

import { httpRequest } from '../httpRequest';
import { RequestMethod } from '../index';

const token = cookie.load('Authorization')
export class API {
  public static my(): Promise<AxiosResponse> {
    return httpRequest({
      url: 'users/my',
      method: RequestMethod.GET,
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
}
