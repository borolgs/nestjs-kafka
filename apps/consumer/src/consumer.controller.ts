import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ConsumerController {
  @MessagePattern('test-topic')
  getMessage(@Payload() message: any) {
    console.log('message', message);
    return {};
  }
}
