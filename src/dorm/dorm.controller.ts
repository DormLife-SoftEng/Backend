import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DormService } from './dorm.service';
import { UserDocument } from '../users/schemas/users.schemas';
import { propsSearchDto } from './dorm.dto';

@Controller('/dorms')
export class DormController {
  constructor(private readonly DormService: DormService) {}

  @Get()
  async getAlldorm() {
    const dorms = await this.DormService.getAll();
    return dorms;
  }

  @Post('/room')
  async addRoom(@Body('room') roomlist: any[]) {
    const rooms = await this.DormService.addRoom(roomlist);
    return rooms;
  }

  @Post('util')
  async addUtil(@Body('util') util: any[]) {
    const utils = await this.DormService.addUtility(util);
    return utils;
  }

  @Get(':id')
  getDorm(@Param('id') dormID: string) {
    return this.DormService.getSingleDorm(dormID);
  }

  @Get(':id/rooms')
  getRoom(@Param('id') dormID: string) {
    return this.DormService.getAllDormRoom(dormID);
  }

  @Get(':id/rooms/:roomid')
  getSingleRoom(@Param('id') dormID: string, @Param('roomid') roomID: string) {
    // console.log(roomID);
    return this.DormService.getDormRoom(dormID, roomID);
  }

  @Post()
  async queryDorm(
    // @Body() propsSearch: propsSearchDto,
    @Query('dormName') dormName: string,
    @Query('distance') distance: number,
    @Query('rating') rating: number,
    @Query('gender') gender: string,
    @Query('price') price: number,
    @Query('maxPerson') maxPerson: number,
    @Query('kitchen') kitchen: number,
    @Query('dormType') dormType: string,
    @Query('airCond') airCond: number,
    @Query('bathroom') bathroom: number,
    @Query('bedroom') bedroom: number,
    @Query('convenienceStore') convenienceStore: string,
    @Query('laundry') laundry: string,
    @Query('parking') parking: string,
    @Query('pet') pet: string,
    @Query('internet') internet: string,
    @Query('smoking') smoking: string,
    @Query('fitness') fitness: string,
    @Query('pool') pool: string,
    @Query('cooking') cooking: string,
    @Query('offset') offset: string,
    @Query('stop') stop: string,
  ) {
    if (!(parseInt(offset) === parseFloat(offset) || offset === undefined)) {
      throw new BadRequestException('offset must be integer.');
    }

    if (!(parseInt(stop) === parseFloat(stop) || stop === undefined)) {
      throw new BadRequestException('stop must be integer.');
    }

    if (offset === undefined) {
      offset = '0';
    }

    if (stop === undefined) {
      stop = '50';
    }

    let propsSearch = {
      dormName: dormName,
      distance: distance,
      rating: rating,
      gender: gender,
      dormType: dormType,
      'room.price': price,
      'room.maxPerson': maxPerson,
      'room.kitchen': kitchen,
      'room.airCond': airCond,
      'room.bathroom': bathroom,
      'room.bedroom': bedroom,
      'utility.type.convenienceStore': convenienceStore,
      'utility.type.laundry': laundry,
      'utility.type.parking': parking,
      'utility.type.pet': pet,
      'utility.type.internet': internet,
      'utility.type.smoking': smoking,
      'utility.type.fitness': fitness,
      'utility.type.pool': pool,
      'utility.type.cooking': cooking,
    };

    if (!dormName) {
      delete propsSearch.dormName;
    }
    if (!distance) {
      delete propsSearch.distance;
    }
    if (!rating) {
      delete propsSearch.rating;
    }
    if (!gender) {
      delete propsSearch.gender;
    }
    if (!dormType) {
      delete propsSearch.dormType;
    }
    if (!price) {
      delete propsSearch['room.price'];
    }
    if (!maxPerson) {
      delete propsSearch['room.maxPerson'];
    }
    if (!kitchen) {
      delete propsSearch['room.kitchen'];
    }
    if (!airCond) {
      delete propsSearch['room.airCond'];
    }
    if (!bathroom) {
      delete propsSearch['room.bathroom'];
    }
    if (!bedroom) {
      delete propsSearch['room.bedroom'];
    }
    if (!convenienceStore) {
      delete propsSearch['utility.type.convenienceStore'];
    }
    if (!laundry) {
      delete propsSearch['utility.type.laundry'];
    }
    if (!parking) {
      delete propsSearch['utility.type.parking'];
    }
    if (!pet) {
      delete propsSearch['utility.type.pet'];
    }
    if (!internet) {
      delete propsSearch['utility.type.internet'];
    }
    if (!smoking) {
      delete propsSearch['utility.type.smoking'];
    }
    if (!fitness) {
      delete propsSearch['utility.type.fitness'];
    }
    if (!pool) {
      delete propsSearch['utility.type.pool'];
    }
    if (!cooking) {
      delete propsSearch['utility.type.cooking'];
    }
    const dorms = await this.DormService.getDormList(propsSearch, offset, stop);
    return dorms;
  }
}
