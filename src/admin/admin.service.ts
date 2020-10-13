import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PendingAction } from './admin.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('PendingAction') private readonly adminModel: Model<PendingAction>,
  ) {}
}
