var util = require("util");
var Rabbus = require("rabbus");
var wascally = require("wascally");

function JobStatusSender(){
  Rabbus.Sender.call(this, wascally, {
    exchange: "job",
    routingKey: "job.status",
    messageType: "job.status"
  });
}

util.inherits(JobStatusSender, Rabbus.Sender);

module.exports = JobStatusSender;
