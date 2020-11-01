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
  Inject,
  Dependencies,
  Req,
  InternalServerErrorException,
  Put,
} from '@nestjs/common';
import { DormService } from './dorm.service';
import * as multer from 'multer';
import { editFileName, imageFileFilter } from './file-upload.utils';

import { ApiTags } from '@nestjs/swagger';
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
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/repositories/user.repository';
import { query } from 'express';
import { Dorm } from './dorm.model';
import { reviewCodeDto } from 'src/review/review.dto';

@Controller('/dorms')
@ApiTags('Dorms')
export class DormController {
  constructor(
    private readonly DormService: DormService,
    private readonly userServ: UsersService,
  ) {}

  @Post('newdorm')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('owner')
  async AddDorm(@Body() dormDto: DormAddDto, @Request() req) {
    // Resolve User Info
    const userDoc: UserDocument = await this.userServ.findById(req.user.userId);
    dormDto.owner = userDoc._id;
    // Insert to Dorm
    // TODO: Should not insert to dorm directly ? pending request instead.
    const createdDorm = await this.DormService.insertDorm(dormDto);
    return { pendingActionId: createdDorm };
  }

  @Get()
  async getAlldorm() {
    const dorms = await this.DormService.getAll();
    return dorms;
  }

  //test
  @Post('/room')
  async addRoom(@Body('room') roomlist: any[]) {
    const rooms = await this.DormService.addRoom(roomlist);
    return rooms;
  }
  //test
  @Post('util')
  async addUtil(@Body('util') util: any[]) {
    const utils = await this.DormService.addUtility(util);
    return utils;
  }

  @Get(':id')
  async getDorm(@Param('id') dormID: string) {
    return await this.DormService.getSingleDorm(dormID);
  }

  @Get(':id/rooms')
  async getRoom(@Param('id') dormID: string) {
    return await this.DormService.getAllDormRoom(dormID);
  }

  @Get(':id/rooms/:roomid')
  async getSingleRoom(
    @Param('id') dormID: string,
    @Param('roomid') roomID: string,
  ) {
    // console.log(roomID);
    return await this.DormService.getDormRoom(dormID, roomID);
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
    // Parsing
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
    };

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

    // console.log(utilsSearch);
    const dorms = await this.DormService.getDormList(
      propsSearch,
      utilsSearch,
      offset,
      stop,
    );
    return dorms;
  }

  @Get('users')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('owner')
  async getUserDorm(@Req() req): Promise<Dorm[] | undefined> {
    // get userdoc
    const userDoc = await this.userServ.findById(req.user.userId);
    try {
      if (!userDoc) {
        throw new Error('Fatal: Exists user not found');
      }
    } catch (err) {
      throw new InternalServerErrorException();
    }
    const query = await this.DormService.getUserDorm(userDoc._id);
    return query;
  }
  // returns array of images' path
  @Post('images')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'image', maxCount: 10 }], {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    console.log(files.image);
    const response = [];
    files.image.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
        ImagePath: `${file.filename}`,
      };
      response.push(fileReponse.ImagePath);
    });

    const result = {
      image: response,
    };
    return result;
  }
  //show image
  @Get('images/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  }

  @Put(':id/reviewCode')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role('owner')
  async generateReviewCode(@Param('id') dormId, @Req() req) {
    const res = await this.DormService.genNewReviewCode(
      req.user.userId,
      dormId,
    );
    return res;
  }

  @Get(':reviewCode')
  async getDomIdByReviewCode(@Param() reviewCode: reviewCodeDto) {
    const dormId = await this.DormService.getDormIdByReviewCode(reviewCode);
    return { id: dormId };
  }
}
