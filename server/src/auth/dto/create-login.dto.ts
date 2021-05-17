import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Phone no should not be empty' })
  phoneNo: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;
}
