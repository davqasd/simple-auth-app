import { Method } from 'axios';

import * as sessions from './sessions/sessions-api';
import * as users from './users/users-api';
export class API {
  public static sessions = sessions.API;
  public static users = users.API;
}

export enum RequestMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IRequest {
  payload?: any;
  query?: {
    [x: string]: string | number | number[] | string[] | null | undefined;
  };
  url: string;
  method: Method;
  headers?: HeadersInit;
}

export interface IServerResponse {
  status: string;
  /**
   * Body response
   */
  data: any;
  /**
   * Response headers
   */
  headers: any;
}

export interface IErrorResponse extends Error {
  response: Response;
}
