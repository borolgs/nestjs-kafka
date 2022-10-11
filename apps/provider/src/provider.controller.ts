import { Controller, Get, Param } from '@nestjs/common';
import { ProviderService } from './provider.service';

@Controller()
export class ProviderController {
  constructor(private readonly service: ProviderService) {}

  @Get('send/:msg')
  sendMessage(@Param('msg') msg: any) {
    return this.service.sendMessage(msg);
  }
}
