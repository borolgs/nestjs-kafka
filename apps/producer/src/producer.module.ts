import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientKafkaModule } from '@shared/client-kafka';
import { producerConfig } from './config';
import { ProducerController } from './producer.controller';
import { ProducerService } from './producer.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [producerConfig] }),
    ClientKafkaModule.registerAsync({
      inject: [producerConfig.KEY],
      useFactory: (config) => config,
    }),
  ],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducerModule {}
