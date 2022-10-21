import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxyFactory } from '@nestjs/microservices';
import { producerConfig, ProducerConfig } from './config';
@Injectable()
export class ProducerService {
  client: ClientKafka;
  constructor(@Inject(producerConfig.KEY) private config: ProducerConfig) {}

  async onModuleInit() {
    this.client = ClientProxyFactory.create(this.config as any) as any;
    this.client.subscribeToResponseOf('test-topic');
    await this.client.connect();
  }

  async sendMessage(msg: any) {
    return this.client.send('test-topic', { msg });
  }
}
