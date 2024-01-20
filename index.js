// 1. დავაყენოთ ფექიჯი moment npm_დან.
//    დავბეჭდოთ სხვაობა 2 თარიღს შორის დღეებში moment_ის დახმარებით.

import moment from "moment";

const date1 = moment("2024-04-15");
const date2 = moment("2024-08-15");

const daysApart = date2.diff(date1, "days");

console.log(`The number of days between is: ${daysApart} days`);

// 2. დავწეროთ პროგრამა რომელიც შეამოწმებს მითითებული დირექტორია
//    არის თუ არა ფაილურ სისტემაში.

const fs = require("fs").promises;

async function searchDirectory(dir) {
  try {
    const stats = await fs.lstat(dir);
    console.log("exists");
  } catch (err) {
    console.log("not exists");
  }
}

searchDirectory(`${__dirname}/parent`);

// 3. გავაკეთოთ მარტივი http სერვერი რომელიც უპასუხებს რამდენიმე
//    http რექვესთს.
//     1. შევქმნათ html ფაილი რომელშიც იქნება მარტივი html კოდი
//       რამდენიმე html ელემენტით.
//       / url_ზე მოთხოვნის გაკეთებისას წავიკითხოთ და დავაბრუნოთ html

//     2. შევქმნათ json ფაილი სადაც სურვილისსამებრ ჩაწერთ რამე json მონაცემებს.
//        /api მისამართზე მოთხოვნის გაკეთებისას სერვერმა უნდა დაგვიბრუნოს
//        json ფაილში ჩაწერილი მონაცემები.

//     3. იგივე პროგრამაში დავამატოთ 404 (არ მოიძებნა) გვერდი (html),
//        რომელსაც დავაბრუნებთ ყველა სხვა შემთხვევაში თუ
//        url არ არის / ან /api.

const http = require("http");
const fs = require("fs").promises;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const htmlString = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    </head>
    <body>
    <h1>Hello</h1>
    <button>World</button>
    </body>
    </html>`;
    res.setHeader("Content-Type", "text/html");
    res.write(htmlString);
    res.end();
  } else if (req.url === "/api") {
    fs.readFile("./data.json", "utf-8").then((data) => {
      res.setHeader("Content-Type", "application/json");
      res.write(data);
      res.end();
    });
  } else {
    res.writeHead(404);
    res.write("Not found");
    res.end();
  }
});

server.listen(3000, "localhost", () => {
  console.log("Server is listening on port 3000");
});
