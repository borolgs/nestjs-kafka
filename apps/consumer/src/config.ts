import { ConfigType, registerAs } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

export const consumerConfig = registerAs(
  'consumer',
  (): KafkaOptions => ({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID ?? 'consumer',
        brokers: [process.env.KAFKA_BROKER ?? 'localhost:29092'],
      },
      consumer: {
        groupId: process.env.KAFKA_CLIENT_ID ?? 'some-group-id',
      },
    },
  }),
);

export type ConsumerConfig = ConfigType<typeof consumerConfig>;
