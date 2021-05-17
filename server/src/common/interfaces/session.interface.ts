import { Request } from 'express';
import { Types } from 'mongoose';
import { AuthType } from '../enum';

export interface JwtPayload {
  iss: string;
  sub: Types.ObjectId;
  type: AuthType;
  token?: string;
  sessionExists?: any;
}

export interface SessionRequest extends Request {
  user: JwtPayload;
}
