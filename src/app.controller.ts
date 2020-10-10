import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('isalive')
  getAlive(@Res() res: Response): Response{
    return res.status(HttpStatus.OK).json(this.appService.getAlive());
  }
}
