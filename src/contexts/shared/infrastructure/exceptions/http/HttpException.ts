import { Response } from 'express';

abstract class HttpException extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, HttpException.prototype);
  }

  abstract handle(response: Response): void;
}

export { HttpException };