import { Controller, Get, HttpStatus, Res,Req, HttpCode, Post, UseInterceptors, UploadedFiles, UploadedFile, Param } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import {editFileName, imageFileFilter} from './file-upload.utils'
import * as multer from 'multer';
import fastify = require('fastify');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('isalive')
  @HttpCode(HttpStatus.OK)
  getAlive(){
    return this.appService.getAlive();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }
  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads' });
  } 
}
