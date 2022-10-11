import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ConsumerController {
  @MessagePattern('user-topic')
  getMessage(@Payload() message: any) {
    console.log('message', message);
    return {};
  }
}
