import { Injectable } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class ProviderService {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: ['localhost:29092'],
      },
      consumer: {
        groupId: 'user-consumer',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('user-topic');
    await this.client.connect();
  }

  sendMessage(msg: any) {
    return this.client.send('user-topic', { msg });
  }
}
