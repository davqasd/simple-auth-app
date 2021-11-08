import { AxiosResponse } from 'axios';

import { httpRequest } from '../httpRequest';
import { RequestMethod } from '../index';

export class API {
  public static create(payload): Promise<AxiosResponse> {
    return httpRequest({
      url: 'sessions',
      method: RequestMethod.POST,
      payload: payload
    });
  }
}
