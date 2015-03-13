var express = require('express');
var emailer = require("nodemailer");
var epa = require("epa").getEnvironment();
var mailer = require("mailer");
var SendEmail = require("../lib/sendEmail");

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/send", function(req, res, next){
  var from = req.body.from;
  var message = req.body.message;
  var subject = "Contact Request: " + req.body.subject;

  var emailInfo = {
    to: "derickbailey@gmail.com",
    message: message,
    subject: subject,
    from: from
  };

  var emailSender = new SendEmail();
  emailSender.send(emailInfo);
  
  res.render("thank-you");
});

module.exports = router;
