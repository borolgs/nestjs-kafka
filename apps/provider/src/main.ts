import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ProviderModule } from './provider.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ProviderModule,
    new FastifyAdapter(),
  );
  await app.listen(3000);
}
bootstrap();
