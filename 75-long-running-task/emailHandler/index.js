var rabbit = require("wascally");
var rabbitConfig = require("rabbitConfig");
var mailer = require("mailer");

rabbit
  .configure(rabbitConfig)
  .then(waitForEmailRequest)
  .then(undefined, reportError);

function reportError(err){
  console.log("ERROR!!!!!!!!!!");
  console.log(err.stack);
  exit();
}

function exit(){
  rabbit.closeAll().then(process.exit);
}

function waitForEmailRequest(){
  console.log("wiating for email send request");

  rabbit.handle("email.send", function(msg){
    console.log("got email send request");
    console.log(msg.body);

    mailer.send(msg.body, function(err){
      if (err) { return reportError(err); }

      console.log("sent email!");
      msg.ack();
    });

  });

  rabbit.startSubscription("email.q");
}
