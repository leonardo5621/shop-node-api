/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-shadow
export enum HTTPCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

export class BackError extends Error {
  public httpCode: HTTPCode;

  constructor(description: string, httpCode: HTTPCode) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = httpCode;

    Error.captureStackTrace(this);
  }
}
