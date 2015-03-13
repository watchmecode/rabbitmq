var util = require("util");
var Rabbus = require("rabbus");
var wascally = require("wascally");

function SendEmail(){

  Rabbus.Sender.call(this, wascally, {
    exchange: "email.ex",
    routingKey: "send",
    messageType: "email.send"
  });

}

util.inherits(SendEmail, Rabbus.Sender);

module.exports = SendEmail;
