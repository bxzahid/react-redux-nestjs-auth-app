import { ModelOptions, plugin, pre, prop } from '@typegoose/typegoose';
import { compareSync, hashSync } from 'bcryptjs';
import { Types } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

@plugin(uniqueValidator, { message: '{VALUE} already taken' })
@ModelOptions({ schemaOptions: { timestamps: true } })
@pre<User>('save', function () {
  this.password = hashSync(this.password);
})
export class User {
  public _id?: Types.ObjectId;

  @prop({ trim: true, unique: true })
  public phoneNo: string;

  @prop({ trim: true })
  public name: string;

  @prop({ trim: true, lowercase: true, unique: true })
  public email: string;

  @prop({ trim: true })
  public password?: string;

  public comparePassword(currentPassword: string): boolean {
    return compareSync(currentPassword, this.password);
  }
}
