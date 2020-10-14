import { BadRequestException, Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DormService } from './dorm.service';
enum Sex {
  'male',
  'female',
  'any',
}
@Controller('/dorms')
export class DormController {
  constructor(private readonly DormService: DormService) {}

  @Post('newdorm')
  async addDorm(
    @Body('name') dormName: string,
    @Body('owner') dormowner: string,
    @Body('contact')
    dormcontact: {
      telelphone: string;
      email: string;
      lineID: string;
      website: string;
    },
    @Body('address')
    dormaddress: {
      address: string;
      coordinate: [number];
    },
    @Body('utility')
    dormutility: any,
    @Body('type')
    dormtype: string,
    @Body('description')
    dormdescription: string,
    @Body('room')
    dormroom: any,
    @Body('allowedSex')
    dormallowedSex: string,
    @Body('license')
    dormlicense: string[],
  ) {
    const genID = await this.DormService.insertDorm(
      dormName,
      dormowner,
      dormcontact.telelphone,
      dormcontact.email,
      dormcontact.lineID,
      dormcontact.website,
      dormaddress.address,
      dormaddress.coordinate,
      dormutility,
      dormtype,
      dormdescription,
      dormroom,
      dormallowedSex,
      dormlicense,
    );

    return { id: genID };
  }

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
  getSingleRoom(@Param('id') dormID:string, @Param('roomid') roomID:string) {
    // console.log(roomID);
    return this.DormService.getDormRoom(dormID, roomID);
  }

  @Post()
  async queryDorm(
    @Body('name') name: string,
    @Body('address') address: any,
    @Body('utility') utils: any,
    @Body('room') rooms: any,
    @Body('allowedSex') allowedSex: string,
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

    const dorms = await this.DormService.getDormList(
      name,
      address.address,
      address.coordinate,
      utils,
      rooms,
      allowedSex,
      offset,
      stop
    );
    return dorms;
  }
}
