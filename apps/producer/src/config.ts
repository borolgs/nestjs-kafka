import { ConfigType, registerAs } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

export const producerConfig = registerAs(
  'producer',
  (): KafkaOptions => ({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID ?? 'producer',
        brokers: [process.env.KAFKA_BROKER ?? 'localhost:29092'],
      },
      consumer: {
        groupId: process.env.KAFKA_GROUP_ID ?? 'some-group-id',
      },
    },
  }),
);

export type ProducerConfig = ConfigType<typeof producerConfig>;
