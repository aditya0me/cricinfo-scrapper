const request = require("request");
const cheerio = require("cheerio");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";

request(url, cb);

function cb(err, res, html) {
    if (err) {
        console.log("error happennnnned");
        console.log(err);
    }
    else {
        let cheerioSelector = cheerio.load(html);
        let element = cheerioSelector(".match-comment .d-flex.match-comment-padder.align-items-center p");
        console.log(element.length);
        //console.log(element.html()); // jugaad when not able to find the unique element using the selector and we need only the first element

        // to bring the 4th last ball from the end .i.e nth element we have to wrap again in cheerio selector , cheerio works like that 
        let fourthLastCommentaryElement = cheerioSelector( element[3] );

        console.log(fourthLastCommentaryElement.text());
    }
}