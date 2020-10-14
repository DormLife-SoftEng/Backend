import { Controller, Get, HttpStatus, Res, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('isalive')
  @HttpCode(HttpStatus.OK)
  getAlive(){
    return this.appService.getAlive();
  }
}
