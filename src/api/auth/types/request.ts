import { Request } from 'express';
import { UserTokenPayload } from './user-token-payload';

export class RequestWithAuth extends Request {
  user: UserTokenPayload;
}
