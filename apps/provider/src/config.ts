import { ConfigType, registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export const providerConfig = registerAs('consumer', () => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: process.env.KAFKA_CLIENT_ID ?? 'provider',
      brokers: [process.env.KAFKA_BROKER ?? 'localhost:29092'],
    },
    consumer: {
      groupId: process.env.KAFKA_GROUP_ID ?? 'some-group-id',
    },
  },
}));

export type ProviderConfig = ConfigType<typeof providerConfig>;
