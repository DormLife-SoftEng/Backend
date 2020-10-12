import { Controller } from '@nestjs/common';
import { DormService } from './dorm.service';

@Controller('/dorms')
export class DormController {
  constructor(private readonly DormService: DormService) {}
}
