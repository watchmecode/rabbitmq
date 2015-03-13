var util = require("util");
var Rabbus = require("rabbus");
var wascally = require("wascally");

function EmailReceiver(){
  Rabbus.Receiver.call(this, wascally, {
    exchange: "email.ex",
    routingKey: "send",
    messageType: "email.send",
    queue: "email.q"
  });
}

util.inherits(EmailReceiver, Rabbus.Receiver);

module.exports = EmailReceiver;
