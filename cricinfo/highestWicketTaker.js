const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
let url2 = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-sunrisers-hyderabad-qualifier-2-1237180/full-scorecard";
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
request(url,cbSirApproach);


function cbSirApproach(err,res,html){
    if(err){
        console.log("Error happened");
    }
    else{
        let cheerioSelector = cheerio.load(html);
        let twoBowlersTable = cheerioSelector(".table.bowler");
        console.log(twoBowlersTable.length);
        for(let i=0;i<twoBowlersTable.length;i++){
            let bowlerTableForInnings = cheerioSelector( twoBowlersTable[i] ).find("tbody tr");
            //console.log(bowlerTableForInnings.length);
            for(let j=0;j<bowlerTableForInnings.length;j++){
                let oneBowlerData = cheerioSelector(bowlerTableForInnings[j]).find("td");
                let bowlerName = cheerioSelector( oneBowlerData[0] ).text();
                let bowlerWicket = cheerioSelector( oneBowlerData[4] ).text();
                console.log(bowlerName,bowlerWicket);
            }

            console.log("````````````````````````````````````````````");
        }


    }
}


function cbMyApproach(err, res, html){
    if(err){
        console.log("erroe happpppppppened");
        console.log(err)
    }
    else{
        const cheerioSelector = cheerio.load(html);

        let totalNoOfBowlersInTheMatch = cheerioSelector(".table.bowler>tbody>tr").length;
        //console.log(totalNoOfBowlersInTheMatch);

        let dataOFTheBowlersTable = cheerioSelector(".table.bowler>tbody>tr>td");
        //console.log(dataOFTheBowlersTable.length);

        let hwtWicket = -1; // hwt- highest wicket taker
        let hwtName = "";
        for(let i=0;i<totalNoOfBowlersInTheMatch;i++){
            //as each bowler row has 11 td , show multiplying value of i*11 for their name, i.e. out when i=0, the name of 1 bowler(0th idx) wiil be at 0*11=0 idx in the dataOFTheBowlersTable and 
            //similarly for i=4 means the 5th bowlers name will be at idx=4*11=44 in the dataOFTheBowlersTable
            let bowlerName =  cheerioSelector( dataOFTheBowlersTable [i * 11 ] ).text();
            let bowlerWicket = cheerioSelector(dataOFTheBowlersTable[ i * 11 + 4  ]).text();
            //console.log( bowlerName, bowlerWicket  );

            if(bowlerWicket>hwtWicket){
                hwtName = bowlerName;
                hwtWicket = bowlerWicket;
            }
        }
        console.log(hwtName,hwtWicket);

        /* The following is just for fun, that is writing the two tables to a html file 
        so tha can be viewed in the browser
        let fileName ="./just_showing_data.html";
        fs.writeFileSync(fileName,"Down");
        let bowlerTable = cheerioSelector(".table.bowler");

        for(let i=0;i<bowlerTable.length;i++){
            fs.appendFileSync(fileName,"<table>");
            let currentTableHtml = cheerioSelector(bowlerTable[i]).html()  ;
            fs.appendFileSync(fileName,currentTableHtml);
            fs.appendFileSync(fileName,"</table>");
        }

        */
    }
    
}