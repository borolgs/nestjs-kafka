import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { consumerConfig } from './config';
import { ConsumerController } from './consumer.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [consumerConfig] })],
  controllers: [ConsumerController],
})
export class ConsumerModule {}
