var rabbit = require("wascally");
var config = require("config.json");

rabbit.configure(config)
  .then(function(){
    rabbit.handle("test.message.type", handleMessage);
    rabbit.startSubscription("sample-q.1");
  })
  .then(undefined, reportError);

function reportError(err){
  console.log(err.stack);
  process.exit();
}

function handleMessage(msg){
  var body = msg.body;

  console.log("received a message");
  console.log(body);
  msg.ack();

  setTimeout(function(){
    // do work
  }, 5000);
}
