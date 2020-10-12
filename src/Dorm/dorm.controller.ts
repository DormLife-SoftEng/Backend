import { Body, Controller, Get, Post } from '@nestjs/common';
import { DormService } from './dorm.service';

@Controller('/dorms')
export class DormController {
  constructor(private readonly DormService: DormService) {}

  @Post()
  async addDorm(@Body('name') dormName:string,@Body('contact') contact:{telephone:string}) {
    const genID = await this.DormService.insert(
      dormName,
      contact
    );
    return {id: genID};
  }

  @Get()
  async getAlldorm() {
    const dorms = await this.DormService.getAll();
    return dorms
  }
}
