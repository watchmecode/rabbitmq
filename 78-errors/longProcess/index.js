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
    var progress = {
      id: request.id,
      percent: 0
    };

    console.log("starting processing...");
    setTimeout(function(){

      console.log("33% done");
      progress.percent = 33;
      jobStatusSender.send(progress);

      setTimeout(function(){

        console.log("66% done");
        progress.percent = 66;
        jobStatusSender.send(progress);

        setTimeout(function(){

          console.log("done processing");
          progress.percent = 100;
          jobStatusSender.send(progress);
          done();

        }, 5000);

      }, 5000);

    }, 5000);
  });
}
