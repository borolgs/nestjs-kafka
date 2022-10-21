import { Controller, Get, Param } from '@nestjs/common';
import { ProducerService } from './producer.service';

@Controller()
export class ProducerController {
  constructor(private readonly service: ProducerService) {}

  @Get('send/:msg')
  sendMessage(@Param('msg') msg: any) {
    return this.service.sendMessage(msg);
  }
}
