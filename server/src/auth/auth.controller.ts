import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { SessionRequest } from '../common/interfaces/session.interface';
import { Session } from '../sessions/schemas/session.schema';
import { AuthService } from './auth.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { CreateSignupDto } from './dto/create-signup.dto';
import { SendOTPDto } from './dto/send-otp.dto';
import { VerifyOTPDto } from './dto/verify-otp.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user-signup')
  registerUser(@Body() createSignupDto: CreateSignupDto): Promise<string> {
    return this.authService.registerUser(createSignupDto);
  }

  @Post('user-login')
  loginUserByPhoneNoAndPassword(
    @Body() createLoginDto: CreateLoginDto,
  ): Promise<any> {
    return this.authService.loginUserByPhoneNoAndPassword(createLoginDto);
  }

  @Post('send-otp')
  sendOTP(@Body() sendOTPDto: SendOTPDto): Promise<any> {
    return this.authService.sendOTP(sendOTPDto);
  }

  @Post('verify-otp')
  verifyOTP(@Body() verifyOtpDto: VerifyOTPDto): Promise<Session> {
    return this.authService.verifyOTP(verifyOtpDto);
  }

  @Post('user-logout')
  @Auth()
  logoutUser(@Request() req: SessionRequest): Promise<string> {
    return this.authService.logoutUser(req);
  }

  @Get('get-me')
  @Auth()
  getMe(@Request() req: SessionRequest): Promise<any> {
    return this.authService.getMe(req);
  }
}
