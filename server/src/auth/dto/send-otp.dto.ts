import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendOTPDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Phone no should not be empty' })
  phoneNo: string;
}
