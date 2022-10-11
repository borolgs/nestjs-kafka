import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { ConsumerConfig, consumerConfig } from './config';
import { ConsumerModule } from './consumer.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ConsumerModule,
    new FastifyAdapter(),
  );
  const config: ConsumerConfig = app.get(consumerConfig.KEY);
  app.connectMicroservice(config);
  await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
