import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserDto {
  _id?: Types.ObjectId;

  @ApiProperty()
  @IsString()
  phoneNo: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/, {
    message:
      'Password must contain at least 1 lowercase, uppercase, numeric character and 6 character long',
  })
  password?: string;
}
