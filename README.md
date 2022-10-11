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

Usage

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