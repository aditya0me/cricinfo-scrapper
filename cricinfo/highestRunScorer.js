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
        
        let highestRun = -1;
        let highestScorer = "";


        let batsmanTableForEachInnings = cheerioSelector(".table.batsman");
        // console.log(batsmanTableForEachInnings.length);
        for(let i=0;i<batsmanTableForEachInnings.length;i++){
            let rowsInTheTable = cheerioSelector(batsmanTableForEachInnings[i]).find("tr");
            // console.log(rowsInTheTable.length);
            for(let j=0;j<rowsInTheTable.length;j++){
            //so if a row in each batsman has 8 columns then it is scroe row of a bastsan
            // other rows like extra ha 4 data columns and commentary for a batsmanwho is out has only one data column
                let currentRowDataColumns = cheerioSelector( rowsInTheTable[j] ).find("td");
                if( currentRowDataColumns.length == 8  ){
                    let playerName = cheerioSelector( currentRowDataColumns[0] ).text(); 
                    let runs = cheerioSelector( currentRowDataColumns[2] ).text();

                    console.log(playerName,"   ",runs);
                    
                    if(Number(runs)>highestRun){
                        highestRun = Number(runs);
                        highestScorer = playerName;
                    }
                }
            }
            console.log("``````````````````````````````````````````");      

        }
        // console.log(typeof highestRun);
        console.log("Highest run scorer is ",highestScorer," with runs ",highestRun);
    }
}

