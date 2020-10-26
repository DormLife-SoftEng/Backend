import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getAlive(): {isalive: boolean} {
    return {isalive: true}
  }
  
}
