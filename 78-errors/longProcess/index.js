var wascally = require("wascally");
var epa = require("epa").getEnvironment();

var JobRequestReceiver = require("./jobRequestReceiver");
var JobStatusSender = require("./jobStatusSender");

// rabbit config and start up
// --------------------------

var rabbitConfig = epa.get("rabbitmq");

wascally
  .configure(rabbitConfig)
  .then(receiveRequests)
  .then(undefined, reportError);

// helpers
// -------

function reportError(err){
  console.log(err.stack);
  exit();
}

function exit(){
  wascally
    .closeAll()
    .then(process.exit);
}

// run the job
// -----------

function receiveRequests(){
  var jobStatusSender = new JobStatusSender();
  var jobRequestReceiver = new JobRequestReceiver();

  jobRequestReceiver.receive(function(request, done){
    console.log("starting processing...");
    setTimeout(function(){

      jobStatusSender.send({percent: 33});
      console.log("33% done");

      setTimeout(function(){
        jobStatusSender.send({percent: 66});
        console.log("66% done");

        setTimeout(function(){
          jobStatusSender.send({percent: 100});
          console.log("done processing");
          done();
        }, 5000);

      }, 5000);

    }, 5000);
  });
}
