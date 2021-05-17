import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { AuthType } from '../../common/enum';

export class Session {
  @prop({ enum: AuthType })
  public type: AuthType;

  @prop()
  public token: string;

  @prop()
  public sub: Types.ObjectId;
}
