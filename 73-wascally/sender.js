var rabbit = require("wascally");
var config = require("config.json");

rabbit.configure(config)
  .then(function(){
    rabbit.publish("sample-ex.1", {
      type: "test.message.type",
      routingKey: "",
      body: {
        foo: "bar"
      }
    });
  })
  .then(undefined, reportError);

function reportError(err){
  console.log(err.stack);
  process.exit();
}
