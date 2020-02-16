// server.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const fetch = require('node-fetch')
var request = require("request");

var Airtable = require("airtable");

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.SECRET
});
var base = Airtable.base("appDAGmboXV3tZabZ");

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/data", function(req, res) {
  var data = [];
  base("tiktoks")
    .select({})
    .eachPage(
      function page(records, fetchNextPage) {
        records.forEach(function(record) {
          var url = record.get("url");
          data.push(url);
        });
        fetchNextPage();
      },
      async function done(err) {
        if (err) {
          console.error(err);
          return;
        } else {
          // retrieves the embed html from tiktok's api
          var result = await getEmbeds(data)
          res.send(result);
        }
      }
    );
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});

// retrieves the embed html from tiktok's api
const getEmbeds = async(urls) => {
  const requests = urls.map((url) =>{
    const path = "https://www.tiktok.com/oembed?url=" + url
    return fetch(path)
      .then(a => a.json())
      .then(data => {return {data: data, url: url}})
  })
  return Promise.all(requests)
}