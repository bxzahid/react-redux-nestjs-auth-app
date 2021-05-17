import { ForbiddenException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { SessionRequest } from 'src/common/interfaces/session.interface';
import { SessionsService } from '../sessions/sessions.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,

    private readonly sessionsService: SessionsService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  async findOne(_id: Types.ObjectId): Promise<User> {
    return await this.userModel.findById(_id);
  }

  async findOneByPhoneNo(phoneNo: string): Promise<User> {
    return await this.userModel.findOne({ phoneNo });
  }

  async logout(req: SessionRequest): Promise<string> {
    if (this.sessionsService.remove(req)) {
      return 'You have logged out successfully';
    } else {
      throw new ForbiddenException(
        'Invalid token or you have already been logged out',
      );
    }
  }
}
