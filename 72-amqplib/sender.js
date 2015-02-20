var amqplib = require("amqplib");

var server = "amqp://test:password@localhost/test-app";

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

function sendMessage(){
  console.log("sending message");
  var msg = process.argv[2];
  var message = new Buffer(msg);
  channel.publish(exchangeName, "", message);
  return channel.close();
}

console.log("connecting");
amqplib.connect(server)
  .then(createChannel)
  .then(createExchange)
  .then(sendMessage)
  .then(process.exit, reportError);

