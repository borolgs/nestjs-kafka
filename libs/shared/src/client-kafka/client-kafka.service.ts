import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxyFactory } from '@nestjs/microservices';
import { Producer } from 'kafkajs';
import { lastValueFrom } from 'rxjs';
import { MODULE_OPTIONS_TOKEN } from './client-kafka.module-definition';
import { ClientKafkaConfig } from './types';

@Injectable()
export class ClientKafkaService {
  public client: ClientKafka;
  public topics: string[];
  constructor(@Inject(MODULE_OPTIONS_TOKEN) private config: ClientKafkaConfig) {
    this.client = ClientProxyFactory.create(this.config) as any;
  }

  async subscribeAndConnect(topics: string | string[]) {
    if (Array.isArray(topics)) {
      this.topics = topics;
      for (const topic of topics) {
        this.client.subscribeToResponseOf(topic);
      }
    } else {
      this.topics = [topics];
      this.client.subscribeToResponseOf(topics);
    }
    await this.client.connect();
  }

  async send<T>(topic: string, payload: T) {
    if (!this.topics.includes(topic)) {
      throw Error(`First subscribe to topic "${topic}"`);
    }
    const res = await lastValueFrom(this.client.send(topic, payload));
    return res;
  }

  async sendMessages<T>(topic: string, messages: T[]) {
    if (!this.topics.includes(topic)) {
      throw Error(`First subscribe to topic "${topic}"`);
    }
    const producer = (this.client as any).producer as Producer;
    const res = await producer.send({
      topic: topic,
      messages: messages.map((m) => ({
        value: JSON.stringify(m),
      })),
    });

    return res;
  }
}
