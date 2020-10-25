import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DormService } from './dorm.service';

import {ApiTags} from '@nestjs/swagger';
enum Sex {
  'male',
  'female',
  'any',
}

import { UserDocument } from '../users/schemas/users.schemas';
import { DormAddDto, propsSearchDto } from './dorm.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/auth/decorator/role.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage} from 'multer';
import { UsersService } from 'src/users/users.service';

@Controller('/dorms')
@ApiTags('Dorms')
export class DormController {
  constructor(
    private readonly DormService: DormService,
    private readonly UserService: UsersService,
    ) {}
  
  @Post('newdorm')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('owner')
  async AddDorm(@Body() dormDto:DormAddDto, @Request() req) {
    // Resolve User Info
    const userDoc: UserDocument = await this.UserService.findById(req.user.userId);
    dormDto.owner = userDoc;
    // Insert to Dorm 
    // TODO: Should not insert to dorm directly ? pending request instead.
    const createdDorm = await this.DormService.insertDorm(dormDto);
    return createdDorm;
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
  getSingleRoom(@Param('id') dormID: string, @Param('roomid') roomID: string) {
    // console.log(roomID);
    return this.DormService.getDormRoom(dormID, roomID);
  }

  @Post()
  async queryDorm(
    // @Body() propsSearch: propsSearchDto,
    @Query('name') name: string,
    @Query('distance') distance: string,
    @Query('rating') rating: string,
    @Query('allowedSex') allowedSex: string,
    @Query('price') price: string,
    @Query('maxperson') maxPerson: string,
    @Query('kitchen') kitchen: string,
    @Query('type') dormType: string,
    @Query('aircond') airCond: string,
    @Query('bathroom') bathroom: string,
    @Query('bedroom') bedroom: string,
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
      name: name,
      allowedSex: allowedSex,
      type: dormType,
      distance: parseInt(distance),
      rating: parseInt(rating),
      'room.price.amount': parseInt(price),
      'room.capacity': parseInt(maxPerson),
      'room.kitchen': parseInt(kitchen),
      'room.aircond': parseInt(airCond),
      'room.bathroom': parseInt(bathroom),
      'room.bedroom': parseInt(bedroom),
    };
    let utilsSearch = {
      convenienceStore: convenienceStore,
      laundry: laundry,
      parking: parking,
      pet: pet,
      internet: internet,
      smoking: smoking,
      fitness: fitness,
      pool: pool,
      cooking: cooking,
    }

    if (!name) {
      delete propsSearch.name;
    }
    if (!distance) {
      propsSearch.distance = -1;
    }
    if (!rating) {
      propsSearch.rating = -1;
    }
    if (!allowedSex) {
      delete propsSearch.allowedSex;
    }
    if (!dormType) {
      delete propsSearch.type;
    }
    if (!price) {
      propsSearch['room.price.amount'] = 99999999999999999999999999999999999;
    }
    if (!maxPerson) {
      delete propsSearch['room.capacity'];
    }
    if (!kitchen) {
      propsSearch['room.kitchen'] = -1;
    }
    if (!airCond) {
      propsSearch['room.aircond'] = -1;
    }
    if (!bathroom) {
      propsSearch['room.bathroom'] = -1;
    }
    if (!bedroom) {
      propsSearch['room.bedroom'] = -1;
    }

    console.log(utilsSearch);
    const dorms = await this.DormService.getDormList(propsSearch, utilsSearch, offset, stop);
    return dorms;
  }
}
