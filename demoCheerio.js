const request =require("request");
const cheerio = require("cheerio");

request("https://www.google.com",cb);

function cb(err,res,html){
    let cheerioSelector = cheerio.load(html);
    //console.log();

    let element = cheerioSelector("#SIvCob");
    console.log(element.html());
    //console.log(element.text());
}

