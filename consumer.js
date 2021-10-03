const { Kafka } = require("kafkajs");
const axios = require("axios").default;


const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:29092"]

});

const run = async () => {
  // const kafka = await getKafka();

  const consumer = kafka.consumer({ groupId: "test-group" });

  await consumer.connect();
  await consumer.subscribe({
    topic: "temperature",
    fromBeginning: true,
  });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};
run();
