var express = require("express");
var uuid = require("node-uuid");

var JobRequestSender = require("../lib/jobRequestSender");
var jobStatus = require("../lib/jobStatus");

// router
// ------

var router = express.Router();

 router.get("/", view);
router.post("/", postJob);

// route handlers
// --------------

function view(req, res, next) {
  var progressList = jobStatus.progress;

  res.render("index", {
    progressList: progressList
  });
} 

function postJob(req, res, next){
  var msg = {
    id: uuid.v1(),
    job: "do some work"
  };

  sendJobRequest(msg, function(err){
    if (err) { return next(err); }
    res.redirect("/");
  });
}

// helpers
// -------

function sendJobRequest(jobRequest, done){
  var sender = new JobRequestSender();
  sender.on("error", done);
  sender.send(jobRequest, done);
}

module.exports = router;
