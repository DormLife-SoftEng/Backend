import {
  Injectable,
} from '@nestjs/common';
import { reviewCodeDto } from 'src/review/review.dto';
import { DormAddDto } from './dorm.dto';
import { RoomInterface, UtilityInterface } from './dorm.model';
import { DormRepository } from './repositories/dorm.repository';

@Injectable()
export class DormService {
  constructor(
    private readonly dormRepo: DormRepository,
  ) {}


  async insertDorm (dorm: DormAddDto) {
    return await this.dormRepo.insertDorm(dorm);
  }

  async getAll () {
    return await this.dormRepo.getAll();
  }

  async addRoom (roomArray: RoomInterface[]) {
    return await this.dormRepo.addRoom(roomArray);
  }

  async addUtility(utilArray: UtilityInterface[]) {
    return await this.dormRepo.addUtility(utilArray);
  }

  async getSingleDorm (dormId: string) {
    return await this.dormRepo.getSingleDorm(dormId);
  }

  async getAllDormRoom (dormId: string) {
    return await this.dormRepo.getAllDormRoom(dormId);
  }

  async getDormRoom (dormId: string , roomId: string) {
    return await this.dormRepo.getDormRoom(dormId, roomId);
  }

  async getDormList (propsearch: any, utilsearch:any, offset: string, stop: string) {
    return await this.dormRepo.getDormList(propsearch, utilsearch, offset, stop);
  }

  async getUserDorm (dormOwnerId: string) {
    return await this.dormRepo.getDormByOwner(dormOwnerId);
  }

  async genNewReviewCode (owner: string, dormId: string) {
    const code = await this.dormRepo.genNewReviewCode(owner, dormId);
    return {'code': code};
  }

  async getDormIdByReviewCode (reviewCode: string) {
    // console.log(reviewCode)
    const dorm = await this.dormRepo.validateCode(reviewCode);
    return dorm._id;
  }
}
