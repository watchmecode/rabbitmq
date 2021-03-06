var express = require("express");
var JobRequestSender = require("../lib/jobRequestSender");

// router
// ------

var router = express.Router();

 router.get("/", view);
router.post("/", postJob);

// route handlers
// --------------

function view(req, res, next) {
  var inProgress = !!req.session.inProgress;
  var progress = req.session.progress;

  res.render("index", {
    inProgress: inProgress,
    progress: progress
  });
} 

function postJob(req, res, next){
  req.session.inProgress = true;

  var msg = {
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
