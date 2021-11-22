import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie'

import { httpRequest } from '../httpRequest';
import { RequestMethod } from '../index';

export class API {
  public static my(): Promise<AxiosResponse> {
    return httpRequest({
      url: 'users/my',
      method: RequestMethod.GET,
      headers: { 'Authorization': `Bearer ${Cookies.get('Authorization')}` }
    });
  }
}
