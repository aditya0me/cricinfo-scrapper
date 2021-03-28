//This is stand alone program a url of scorecard of a match will be provided, call the function and this will print the winning team batting innings 
const request = require("request");
const cheerio = require("cheerio");
let url2 = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/kolkata-knight-riders-vs-rajasthan-royals-54th-match-1216530/full-scorecard";
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url2, cb);

function cb(err, res, html) {
    if(err){
        console.log("error happppppppened");
        return;
    }
    let cheerioSelector = cheerio.load(html);

    let bothTheTeams = cheerioSelector(".match-header .match-info.match-info-MATCH>.teams>.team");

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
      for(let i=0;i<winningTeamInningsBatsmanTableRows.length;i++){
        //if the row has eight td columns , then only it will be the row in which a batsman performance will be available, other tr in the table like extras(has 4 td columns) and how they got out(has 1 td column)
        //console.log("Inside for");
        let currentRowData =  cheerioSelector(winningTeamInningsBatsmanTableRows[i]).find("td");
        //console.log(currentRowData.length);
        if(currentRowData.length === 8){
            let playerName = cheerioSelector(currentRowData[0]).text().trim();
            let playerRun = cheerioSelector(currentRowData[2]).text().trim();
            console.log(playerName,"   ",playerRun);
        }
        
    }
}
