var emailer = require("nodemailer");
var epa = require("epa").getEnvironment();

var mailer = {
  
  // send email
  send: function(options, done){
    var smtp = epa.get("smtp");
    smtp.apiKey = epa.get("MANDRILL_KEY");

    var transport = emailer.createTransport({
      host: smtp.host,
      secure: false,
      port: smtp.port,
      auth: {
        user: smtp.username,
        pass: smtp.apiKey
      }
    });

    var messageData = {
      to: "derickbailey@gmail.com",
      from: options.from,
      subject: options.subject,
      text: options.message
    };

    transport.sendMail(messageData, done);
  }

};

module.exports = mailer;
