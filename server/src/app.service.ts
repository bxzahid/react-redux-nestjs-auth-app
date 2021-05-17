import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Session } from 'src/sessions/schemas/session.schema';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,

    @InjectModel(Session)
    private readonly sessionModel: ReturnModelType<typeof Session>,
  ) {}

  getHello(): string {
    return 'Hello World';
  }

  async deleteAllData(): Promise<any> {
    await this.userModel.deleteMany({});
    await this.sessionModel.deleteMany({});
    return { message: 'All Data successfully deleted' };
  }
}
