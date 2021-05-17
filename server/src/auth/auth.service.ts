import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from 'nestjs-typegoose';
import { AuthType } from '../common/enum';
import { SessionRequest } from '../common/interfaces/session.interface';
import { Session } from '../sessions/schemas/session.schema';
import { SessionsService } from '../sessions/sessions.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { SendOTPDto } from './dto/send-otp.dto';
import { VerifyOTPDto } from './dto/verify-otp.dto';

const config: ConfigService = new ConfigService();

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<string> {
    const users: User = await this.usersService.create(createUserDto);

    if (users) return 'You have registered successfully';
  }

  async loginUserByPhoneNoAndPassword(
    createLoginDto: CreateLoginDto,
  ): Promise<any> {
    const { phoneNo, password } = createLoginDto;

    const user: User = await this.usersService.findOneByPhoneNo(phoneNo);

    if (!user) throw new UnauthorizedException('Invalid Credentials');

    const matched: boolean = user.comparePassword(password);

    if (!matched) throw new UnauthorizedException('Invalid Credentials');

    const session = await this.sessionsService.findOneOrCreate(
      user._id,
      AuthType.USER,
    );

    return {
      message: 'You have logged in successfully',
      token: session?.token,
    };
  }

  async logoutUser(req: SessionRequest): Promise<string> {
    if (this.sessionsService.remove(req)) {
      return 'You have logged out successfully';
    } else {
      throw new ForbiddenException(
        'Invalid token or you have already been logged out',
      );
    }
  }

  async verifyToken(token, secret) {
    try {
      return await this.jwtService.verifyAsync(token, secret);
    } catch (error) {
      if (error.message === 'invalid token') {
        return { isInvalid: true };
      }

      if (error.message === 'jwt expired') {
        return { isExpired: true };
      }
    }
  }

  async sendOTP(sendOTPDto: SendOTPDto): Promise<any> {
    const { phoneNo } = sendOTPDto;

    const user: User = await this.usersService.findOneByPhoneNo(phoneNo);

    if (!user)
      throw new NotFoundException(
        `Wrong phone number! You are not sign up with ${phoneNo} number`,
      );

    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log(otp);

    const accountSid = config.get('ACCOUNT_SID');
    const authToken = config.get('AUTH_TOKEN');
    const twilioNum = config.get('TWILIO_PHONE_NUMBER');

    const client = require('twilio')(accountSid, authToken);

    try {
      await client.messages.create({
        from: twilioNum,
        to: phoneNo,
        body: `Your otp is ${otp}`,
      });

      const otpToken = jwt.sign({ otp }, config.get('JWT_SECRET'), {
        expiresIn: '1h',
      });

      return { otpToken };
    } catch (e) {
      throw new ForbiddenException(
        "Phone number must be verified with country code. N.B - Twilio Free Version, that's why we cann't send otp in your number.",
      );
    }
  }

  async verifyOTP(verifyOtpDto: VerifyOTPDto): Promise<Session> {
    const { phoneNo, otp, otpToken } = verifyOtpDto;

    const response: any = await jwt.verify(otpToken, config.get('JWT_SECRET'));

    if (response?.exp > Date.now()) {
      throw new ForbiddenException({
        isExpired: true,
        message: 'Your otp is expired',
      });
    }

    if (otp != response?.otp)
      throw new ForbiddenException({
        verification: false,
        message: 'Your otp is incorrect',
      });

    const user: User = await this.usersService.findOneByPhoneNo(phoneNo);

    if (!user) throw new UnauthorizedException('User not found');

    return await this.sessionsService.findOneOrCreate(user._id, AuthType.USER);
  }

  async getMe(req: SessionRequest): Promise<any> {
    const { sub, type } = req?.user?.sessionExists;
    const sessionExists = await this.sessionsService.findOneBySubAndType(
      sub,
      type,
    );
    if (!sessionExists) {
      return null;
    }
    const users = this.usersService.findOne(sub);
    (await users).password = null;

    return users;
  }
}
