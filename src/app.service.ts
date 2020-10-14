import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hallo World!';
  }

  getAlive(): {isalive: boolean} {
    return {isalive: true}
  }
}
