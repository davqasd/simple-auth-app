import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie'

import { httpRequest } from '../httpRequest';
import { RequestMethod } from '../index';

const token = Cookies.get('Authorization')
export class API {
  public static my(): Promise<AxiosResponse> {
    return httpRequest({
      url: 'users/my',
      method: RequestMethod.GET,
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }
}
