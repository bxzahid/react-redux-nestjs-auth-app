import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyOTPDto {
  @ApiProperty()
  phoneNo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'OTP should not be empty' })
  otp: string;

  @ApiProperty()
  otpToken: string;
}
