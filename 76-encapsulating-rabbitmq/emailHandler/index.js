var rabbit = require("wascally");
var mailer = require("mailer");
var epa = require("epa").getEnvironment();
var EmailReceiver = require("./emailReceiver");

var rabbitConfig = epa.get("rabbitmq");

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
  var emailReceiver = new EmailReceiver();
  emailReceiver.receive(sendEmail);
}

function sendEmail(emailConfig, done){
  mailer.send(emailConfig, function(err){
    if (err) { return reportError(err); }

    console.log("sent the email!");
    console.log(emailConfig);

    done();
  });
}
