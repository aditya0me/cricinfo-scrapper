const fs=require("fs");
console.log("----------------------Before----------------------");
//*following is the bottleneck,file ka kaam, db ka kaam, image processing ka kaam , ya koi heavy time consuming kaam
//let contents = fs.readFileSync("index.html","utf-8");
// *problem yee ho rahi he ki jab tak file read nhi ho jata toh tab tak code aage nahi badhega, toh after ke aage koi kaam karna ho toh nahi kar paoge
//*Aaap jab  server bana rahe ho, will you want to wait for the file to be read, answer is no, You will give this task to background ,toh uss time koi aur bande ka request marne ki wait karo
//console.log(contents);
fs.readFile("index.html","utf-8",cb);
console.log("----------------------After----------------------");
console.log("Other work");


function cb(err,contents){
    console.log(contents);
}