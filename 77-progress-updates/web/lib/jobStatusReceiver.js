var util = require("util");
var Rabbus = require("rabbus");
var wascally = require("wascally");

function JobStatusReceiver(){
  Rabbus.Receiver.call(this, wascally, {
    exchange: "job",
    routingKey: "job.status",
    messageType: "job.status",
    queue: "job.status"
  });
}

util.inherits(JobStatusReceiver, Rabbus.Receiver);

module.exports = JobStatusReceiver;
