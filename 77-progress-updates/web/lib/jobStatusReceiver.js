var util = require("util");
var Rabbus = require("rabbus");

function JobStatusReceiver(rabbus){
  Rabbus.Receiver.call(this, rabbus, {
    exchange: "",
    queue: "",
    routingKey: "",
    messageType: ""
  });
}

util.inherits(JobStatusReceiver, Rabbus.Sender);

module.exports = JobStatusReceiver;
