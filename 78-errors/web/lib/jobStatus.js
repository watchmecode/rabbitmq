var JobStatusReceiver = require("./jobStatusReceiver");

var jobStatus = {
  progress: 0,

  listen: function(){
    var receiver = new JobStatusReceiver();
    receiver.receive(function(status, done){
      jobStatus.progress = status.percent;
      done();
    });
  }

};

module.exports = jobStatus;
