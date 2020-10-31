import {
  Injectable,
} from '@nestjs/common';
import { DormRepository } from './repositories/dorm.repository';

@Injectable()
export class DormService {
  constructor(
    private readonly dormRepo: DormRepository,
  ) {}

  // Override

  insertDorm = this.dormRepo.insertDorm;

  getAll = this.dormRepo.getAll;

  addRoom = this.dormRepo.addRoom;

  addUtility = this.dormRepo.addUtility;

  getSingleDorm = this.dormRepo.getSingleDorm;

  getAllDormRoom = this.dormRepo.getAllDormRoom;

  getDormRoom = this.dormRepo.getDormRoom;

  getDormList = this.dormRepo.getDormList;

  getUserDorm = this.dormRepo.getDormByOwner;

  async genNewReviewCode (owner: string, dormId: string) {
    const code = await this.dormRepo.genNewReviewCode(owner, dormId);
    return {'code': code};
  }

}
