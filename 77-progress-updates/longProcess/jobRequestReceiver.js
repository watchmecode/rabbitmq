var util = require("util");
var Rabbus = require("rabbus");

function JobRequestReceiver(rabbus){
  Rabbus.Receiver.call(this, rabbus, {
    exchange: "",
    queue: "",
    routingKey: "",
    messageType: ""
  });
}

util.inherits(JobRequestReceiver, Rabbus.Sender);

module.exports = JobRequestReceiver;
