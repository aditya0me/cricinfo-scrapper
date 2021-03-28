const request = require("request");
const cheerio = require("cheerio");
const singleMatchWinningTeamBatsmanTable = require("./singleMatchWinningTeamBatsmanTable");
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

request(url,cb);

function cb(err,res,html){
    let cheerioSelector = cheerio.load(html);

    let requiredUrls = [];
    let allMatchCards = cheerioSelector(".match-cta-container");
    //console.log(allMatchCards.length);

    let scorecardUrlOf_AllMatches = [];
    //traverse through each match and add the scorecard Url Of All matches to an array
    for(let i=0;i<allMatchCards.length;i++){
       let all4LinksOfAmatch = cheerioSelector( allMatchCards[i] ).find(".match-cta-container>.btn.btn-sm.btn-outline-dark.match-cta");

       let scorecardLinkOfAMatch = cheerioSelector( all4LinksOfAmatch[2] ).attr("href");
       let fullLink = "https://www.espncricinfo.com" + scorecardLinkOfAMatch;
       //console.log(fullLink);
       scorecardUrlOf_AllMatches.push(fullLink);
    }
    //console.log(scorecardUrlOf_AllMatches.length);
    doTheWorkForEachMatch(scorecardUrlOf_AllMatches);
}

function doTheWorkForEachMatch(scorecardUrlArray){
    for(let i=0;i<scorecardUrlArray.length;i++){
        singleMatchWinningTeamBatsmanTable.fn(scorecardUrlArray[i]);
    }
}

