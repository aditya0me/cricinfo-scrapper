const request = require("request");

request("https://www.google.com",cb);

//response includes the html within it
function cb(err,response,html){
    
   console.log(html);
}
