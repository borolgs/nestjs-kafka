import { Injectable } from '@nestjs/common';
import { ClientKafkaService } from '@shared/client-kafka';

@Injectable()
export class ProducerService {
  constructor(private producer: ClientKafkaService) {}

  async onModuleInit() {
    await this.producer.subscribeAndConnect(['test-topic', 'test-topic-2']);
  }

  async sendMessage(msg: any) {
    return this.producer.send('test-topic-2', { msg });
  }
}
