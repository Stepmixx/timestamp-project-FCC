const express = require("express");
const app = express();

// enable CORS so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", function (req, res) {
  const { date } = req.params;
  const timestampRegex = /^(\d{0,13})$/;

  if (timestampRegex.test(date)) {
    res.json({ unix: Number(date), utc: new Date(Number(date)).toUTCString() });
    return;
  }

  if (new Date(date).getTime() > 0) {
    const myDateInUTC = new Date(date).toUTCString();
    const myDateInUnix = new Date(date).getTime();
    res.json({ unix: myDateInUnix, utc: myDateInUTC });
    return;
  }

  if (!date) {
    const currentDateInUTC = new Date().toUTCString();
    const currentDateInUnix = new Date().getTime();
    res.json({ unix: currentDateInUnix, utc: currentDateInUTC });
    return;
  }

  res.json({ error: "Invalid Date" });
});

// listen for requests :)
const listener = app.listen(3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
