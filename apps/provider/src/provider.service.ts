import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxyFactory } from '@nestjs/microservices';
import { providerConfig, ProviderConfig } from './config';

@Injectable()
export class ProviderService {
  client: ClientKafka;
  constructor(@Inject(providerConfig.KEY) private config: ProviderConfig) {}

  async onModuleInit() {
    this.client = ClientProxyFactory.create(this.config as any) as any;
    this.client.subscribeToResponseOf('test-topic');
    await this.client.connect();
  }

  async sendMessage(msg: any) {
    return this.client.send('test-topic', { msg });
  }
}
