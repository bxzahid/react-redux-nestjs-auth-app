import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthType } from '../common/enum';
import {
  JwtPayload,
  SessionRequest,
} from '../common/interfaces/session.interface';
import { Session } from './schemas/session.schema';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session)
    private readonly sessionModel: ReturnModelType<typeof Session>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async create(sub: Types.ObjectId, type: AuthType): Promise<Session> {
    const token: string = this.generateToken(sub, type);

    return await this.sessionModel.create({ type, token, sub });
  }

  async findOneOrCreate(sub: Types.ObjectId, type: AuthType): Promise<Session> {
    const session: Session = await this.findOneBySubAndType(sub, type);

    if (!session) {
      return this.create(sub, type);
    }

    return session;
  }

  async findAll(): Promise<DocumentType<Session>[]> {
    return await this.sessionModel.find();
  }

  async findOneBySubAndType(
    sub: Types.ObjectId,
    type: AuthType,
  ): Promise<DocumentType<Session>> {
    return await this.sessionModel.findOne({ sub, type });
  }

  async remove(req: SessionRequest): Promise<boolean> {
    const { sub, type } = req?.user?.sessionExists;

    const deleted: Session = await this.sessionModel.findOneAndRemove({
      sub,
      type,
    });

    if (!deleted) throw new NotFoundException('Invalid or deleted session');
    return true;
  }

  generateToken(sub: Types.ObjectId, type: AuthType): string {
    const payload: JwtPayload = {
      iss: this.configService.get<string>('APP_NAME'),
      sub,
      type,
    };
    return this.jwtService.sign(payload);
  }
}
