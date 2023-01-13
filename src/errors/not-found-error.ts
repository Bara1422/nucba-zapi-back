import { CustomError } from './custom-error';

export class NotFountError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Route not found');
    Object.setPrototypeOf(this, NotFountError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not found!' }];
  }
}
