# Nestjs Kafka Example
Simplest example of Producer and Consumer apps.  

Monorepo project:
```sh
apps
  consumer
    src
      consumer.controller.ts # use @MessagePattern()
      consumer.module.ts # app.connectMicroservice({..}) and app.startAllMicroservices()
  provider
    src
      provider.service.ts # use @Client({..}) client: ClientKafka; subscribe to topic and send
```

## Usage

```sh
pnpm i

docker compose up # kafka

pnpm run start:dev # provider
pnpm run start:dev consumer
```
Provider  
GET http://localhost:3000/send/hello

Consumer  
`message { msg: 'hello' }`

Kafka UI
http://localhost:8080

## Batch

Use kafkajs mannualy, or extract it from ClientKafka and ServerKafka:
```ts
// producer.service.ts
const client = ClientProxyFactory.create(config);
const producer = (client as any).producer;
producer.send({
  topic: 'test-topic',
  messages: [{ value: 'a' }, { value: 'b' }, { value: 'c' }],
});

// consumer/main.ts
const serverKafka = app.connectMicroservice(config);

await app.startAllMicroservices();
await app.listen(4000);

const consumer: Consumer = (serverKafka as any).server.consumer;
await consumer.stop();
await consumer.connect();
await consumer.subscribe({ topics: ['test-topic'] });
await consumer.run({
  eachBatch: async ({ batch, resolveOffset, heartbeat }) => {
    const messages = [];
    for (const message of batch.messages) {
      messages.push(message.value?.toString());

      resolveOffset(message.offset);
      await heartbeat();
    }
    console.log('messages', messages);
  },
});

```
Or extends ServerKafka class:  

```ts
export class KafkaCustomTransport extends ServerKafka implements CustomTransportStrategy
{
  override async bindEvents(consumer: Consumer) {
    await consumer.subscribe({ topics: ['test-topic'] });
    await consumer.run({
      ...this.options,
      eachBatch: async ({ batch, resolveOffset, heartbeat }) => {
        const messages = [];
        for (const message of batch.messages) {
          messages.push(message.value?.toString());

          resolveOffset(message.offset);
          await heartbeat();
        }
        console.log('messages', messages);
      },
    });
  }
}

// consumer/main.ts
app.connectMicroservice({
  strategy: new KafkaCustomTransport(config.options),
});

```

https://github.com/borolgs/nestjs-kafka/blob/batch/apps/consumer/src/server-kafka.ts
