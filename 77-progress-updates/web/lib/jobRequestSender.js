var util = require("util");
var Rabbus = require("rabbus");

function JobRequestSender(rabbus){
  Rabbus.Sender.call(this, rabbus, {
    exchange: "",
    routingKey: "",
    messageType: ""
  });
}

util.inherits(JobRequestSender, Rabbus.Sender);

module.exports = JobRequestSender;
