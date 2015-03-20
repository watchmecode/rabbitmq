var util = require("util");
var Rabbus = require("rabbus");
var wascally = require("wascally");

function JobRequestReceiver(){
  Rabbus.Receiver.call(this, wascally, {
    exchange: "job",
    queue: "job.request",
    routingKey: "job.request",
    messageType: "job.request"
  });
}

util.inherits(JobRequestReceiver, Rabbus.Receiver);

module.exports = JobRequestReceiver;
