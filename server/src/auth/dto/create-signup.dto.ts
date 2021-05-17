import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSignupDto {
  _id?: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phone no should not be empty' })
  phoneNo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/, {
    message:
      'Password must contain at least 1 lowercase, uppercase, numeric character and 6 character long',
  })
  password?: string;
}
