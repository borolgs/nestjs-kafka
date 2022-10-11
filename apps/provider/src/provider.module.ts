import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { providerConfig } from './config';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [providerConfig] })],
  controllers: [ProviderController],
  providers: [ProviderService],
})
export class ProviderModule {}
