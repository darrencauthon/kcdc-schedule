var express = require("express"),
    app = express.createServer(),
    csv = require("csv"),
    stylus = require("stylus"),
    scheduleFile = __dirname + "/data/schedule.csv",
    port = process.env.PORT || 8080,
    moment = require('moment'),
    data = require('./data.json');

app.set("view engine", "jade");

app.use(stylus.middleware({
  src: __dirname + "/public",
  dest: __dirname + "/public"
}));

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.render("index", { events: data });
});

app.listen(port);