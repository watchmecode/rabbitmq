var JobStatusReceiver = require("./jobStatusReceiver");

var jobStatus = {
  progress: {},

  listen: function(){
    var receiver = new JobStatusReceiver();
    receiver.receive(function(status, done){
      jobStatus.progress[status.id] = status;
      done();
    });
  }

};

module.exports = jobStatus;
