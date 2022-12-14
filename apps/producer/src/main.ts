import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ProducerModule } from './producer.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ProducerModule,
    new FastifyAdapter(),
  );
  await app.listen(3000);
}
bootstrap();
