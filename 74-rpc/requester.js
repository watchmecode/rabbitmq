var rabbit = require("wascally");
var config = require("config.json");

rabbit.configure(config)
  .then(sendMessage)
  .then(handleReply)
  .then(undefined, reportError);

function sendMessage(){
  return rabbit.request("sample-req-ex", {
    type: "a.request",
    routingKey: "",
    body: {
      foo: "bar"
    }
  });
}

function handleReply(response){
  console.log("");
  console.log("got a response:");
  console.log(response.body);
  response.ack();
}

function reportError(err){
  console.log(err.stack);
  process.exit();
}

