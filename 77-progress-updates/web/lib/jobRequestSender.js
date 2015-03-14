var util = require("util");
var Rabbus = require("rabbus");
var wascally = require("wascally");

function JobRequestSender(){
  Rabbus.Sender.call(this, wascally, {
    exchange: "job",
    routingKey: "job.request",
    messageType: "job.request"
  });
}

util.inherits(JobRequestSender, Rabbus.Sender);

module.exports = JobRequestSender;
