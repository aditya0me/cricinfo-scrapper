/*
* The function of this file will be called from the leaderboard.js, through module.exports 
* leaderboard.js will pass (scorecard url of a match) to the function printWinningTeamBatsmanTable in this file.
* now this printWinningTeamBatsmanTable function will request the scorecard url, get the html, decide who is the winning team, then select the winning team  batsman table, and store the batsman performance of the winning team and print them
* This file is just modification of the winningTeamBastsmanTable file(which is a standalone script to decide the winning team and printing winning team batsman stats  )  
*
*/

const request = require("request");
const cheerio = require("cheerio");

function printWinningTeamBatsmanTable(scorecardUrlForSingleMatch){
    //console.log("The scorecard url of the match:-",scorecardUrlForSingleMatch);
    request(scorecardUrlForSingleMatch,cb);
}

function cb(err,res,html){
    if(err){
        console.log("error happppppppened");
        return;
    }
    let cheerioSelector = cheerio.load(html);

    let bothTheTeams = cheerioSelector(".match-header .match-info.match-info-MATCH>.teams>.team");

    console.log('Match between: ',cheerioSelector(bothTheTeams[0]).find("a>p").text()," and ",cheerioSelector(bothTheTeams[1]).find("a>p").text());

    let winningTeamElement = "";
    //By the following if eles block we will decide which is the loosing team if it's name is displayed in gray (If we get loosing team then the other is winning team)
    if (cheerioSelector(bothTheTeams[0]).hasClass("team-gray") == false) {
        winningTeamElement = bothTheTeams[0];
    }
    else {
        winningTeamElement = bothTheTeams[1];
    }

    let winningTeamName = cheerioSelector(winningTeamElement).find("a>p").text();
    //console.log(winningTeamName);

    let inningsTable = cheerioSelector(".card.content-block.match-scorecard-table .Collapsible");

    let battingTeamNameInInnings0 = cheerioSelector(inningsTable[0]).find(".header-title.label").text();
    //console.log(battingTeamInInnings0);

    /*now to extract the actual team name from the string battingTeamInInnings0 , if it matches with the string winningTeamName, Then first Innings team has won the match and we require it's batsama table
    * Other wise the the team batting in innings 1 , has won the match
   */

    //console.log(battingTeamNameInInnings0.split("INNINGS"));
    //console.log(battingTeamNameInInnings0.split("INNINGS").shift().trim());
    let winningTeamInningsElement;
    if (battingTeamNameInInnings0.split("INNINGS").shift().trim() === winningTeamName.trim()) {
        //console.log("Inside If block");
        //console.log(battingTeamNameInInnings0.split("INNINGS").shift().trim());
        winningTeamInningsElement = inningsTable[0];
    }
    else {
        //console.log("Inside else block");
        //console.log(cheerioSelector(inningsTable[1]).find(".header-title.label").text().split("INNINGS").shift().trim());
        winningTeamInningsElement = inningsTable[1];
    }

      let winningTeamInningsBatsmanTableRows =  cheerioSelector(winningTeamInningsElement).find(".table.batsman tbody>tr")  ;
      //console.log("fine",winningTeamInningsBatsmanTableRows.length);

      let statsArr = [];
      for(let i=0;i<winningTeamInningsBatsmanTableRows.length;i++){
        //if the row has eight td columns , then only it will be the row in which a batsman performance will be available, other tr in the table like extras(has 4 td columns) and how they got out(has 1 td column)
        //console.log("Inside for");
        let currentRowData =  cheerioSelector(winningTeamInningsBatsmanTableRows[i]).find("td");
        //console.log(currentRowData.length);
        if(currentRowData.length === 8){
            let playerName = cheerioSelector(currentRowData[0]).text().trim();
            let playerRun = cheerioSelector(currentRowData[2]).text().trim();
            //console.log(playerName,"   ",playerRun);
            statsArr.push({
                Name:playerName,
                Run:playerRun
            });
        }
        
    }
    console.table(statsArr);
    console.log("````````````````````````````````````````");
}

module.exports= {
    "fn" : printWinningTeamBatsmanTable
};