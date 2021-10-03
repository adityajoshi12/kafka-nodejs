const { Kafka } = require("kafkajs");
const deviceNames = ['SBS01', 'SBS02', 'SBS03', 'SBS04', 'SBS05', 'SBS06']
const kafka = new Kafka({
  clientId: "my-app",
  brokers: [
    "localhost:29092"
  ]
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
const getRandomDevice = () => deviceNames[Math.floor(Math.random() * deviceNames.length)];

function getTemperatureValues() {
  let data = {}
  data['deviceValue'] = getRandomInt(15, 40)
  data['deviceParameter'] = 'Temperature'
  data['deviceId'] = getRandomDevice()
  data['dateTime'] = new Date();
  data['topic'] = 'temperature'
  return data
}

function getHumidityValues() {
  let data = {}
  data['deviceValue'] = getRandomInt(50, 90)
  data['deviceParameter'] = 'Humidity'
  data['deviceId'] = getRandomDevice()
  data['dateTime'] = new Date();
  data['topic'] = 'humidity'
  return data
}

function getSoundValues() {
  let data = {}
  data['deviceValue'] = getRandomInt(100, 140)
  data['deviceParameter'] = 'Sound'
  data['deviceId'] = getRandomDevice()
  data['dateTime'] = new Date();
  data['topic'] = 'sound'
  return data
}

function getFlowValues() {
  let data = {}
  data['deviceValue'] = getRandomInt(60, 100)
  data['deviceParameter'] = 'Flow'
  data['deviceId'] = getRandomDevice()
  data['dateTime'] = new Date();
  data['topic'] = 'flow'
  return data
}
const run = async () => {
  // let data = getTemperatureValues();
  let data = getHumidityValues()
  const producer = kafka.producer();
  await producer.connect();
  let result = await producer.send({
    topic: data.topic,
    messages: [
      {
        partition: 0,
        value: JSON.stringify(data),
      },
    ],
  });

  console.log(result);
};

setInterval(async () => {
  run();

}, 2000)
