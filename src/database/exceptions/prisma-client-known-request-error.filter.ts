import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientKnownRequestErrorFilter implements ExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        const fields = exception.meta.target as string[];
        const message = fields.map((field) => `${field} must be unique`);
        response.status(status).json({
          message: message,
          error: 'Conflict',
          statusCode: status,
        });
        break;
      }
      default:
        const internalServerErrorException = new InternalServerErrorException();
        response
          .status(internalServerErrorException.getStatus())
          .json(internalServerErrorException.getResponse());
        break;
    }
  }
}
