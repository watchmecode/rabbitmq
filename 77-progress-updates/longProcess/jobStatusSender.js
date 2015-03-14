var util = require("util");
var Rabbus = require("rabbus");

function JobStatusSender(rabbus){
  Rabbus.Sender.call(this, rabbus, {
    exchange: "",
    routingKey: "",
    messageType: ""
  });
}

util.inherits(JobStatusSender, Rabbus.Sender);

module.exports = JobStatusSender;
