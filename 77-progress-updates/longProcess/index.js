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

function receiveRequests(request, done){
  
}
