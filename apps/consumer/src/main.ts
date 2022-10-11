import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { ConsumerModule } from './consumer.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ConsumerModule,
    new FastifyAdapter(),
  );
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:29092'],
      },
      consumer: {
        groupId: 'user-consumer',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();
