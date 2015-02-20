var amqplib = require("amqplib");

var server = "amqp://test:password@localhost/test-app";

var queueName = "test.q";
var exchangeName = "test.ex";
var connection, channel;

function reportError(err){
  console.log("Error happened!! OH NOES!!!!");
  console.log(err.stack);
  process.exit(1);
}

function createChannel(conn){
  console.log("creating channel");
  connection = conn;
  return connection.createChannel();
}

function createExchange(ch){
  console.log("creating exchange");
  channel = ch;
  return channel.assertExchange(exchangeName, "direct");
}

function createQueue(){
  console.log("creating queue");
  return channel.assertQueue(queueName);
}

function bindExQueue(){
  console.log("binding exchange to queue");
  return channel.bindQueue(queueName, exchangeName, "");
}

function consumeMessages(){
  console.log("consuming messages");
  channel.consume(queueName, function(msg){
    if (!msg) { return; }

    console.log("");
    console.log("Received a message!");
    console.log(msg.content.toString());
    channel.ack(msg);
  });
}

console.log("connecting");
amqplib.connect(server)
  .then(createChannel)
  .then(createExchange)
  .then(createQueue)
  .then(bindExQueue)
  .then(consumeMessages)
  .then(undefined, reportError);
