var express = require("express"),
    app = express.createServer(),
    csv = require("csv"),
    stylus = require("stylus"),
    scheduleFile = __dirname + "/data/schedule.csv",
    port = 8080,
    moment = require('moment');

app.set("view engine", "jade");

app.use(stylus.middleware({
  src: __dirname + "/public",
  dest: __dirname + "/public"
}));

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  var events = [];
  var data = require('./data.json');
  
  data.forEach(function (s) {
    s['time'] = moment(s['time']).format("ddd, h:mA");
  });

  res.render("index", { events: data });
});

app.listen(port);