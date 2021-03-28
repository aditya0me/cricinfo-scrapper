const fs=require("fs");
console.log("----------------------Before----------------------");
fs.readFile("index.html","utf-8",cb);
console.log("----------------------After----------------------");
console.log("Other work");
while(true){

}



function cb(err,contents){
    console.log(contents);
}

/*
* eei code re bahut learning achi
* async ku dei dele meaning hela seta ebe pain importatnt nuha,
* so eei file re jaha sabu kama achi sarila pare se jai haba.
* taa ei bhalia kama for ex-(file reading , database) kama pain  node and browser both give async functionality
* developer pain , hame threads nhi dekhni, tumhe yee nahi dekhni ki meni agle core ke kaise yee kam pahnchaunga aur karnke baad tumhare paas kaise leke aaunga
* aap mujhe data aur kya karna he pass kardo, jab kaam khatam ho jaega main yee apka function call kardunga
* tab tak aapka aur koi kaam baki ho toh , wo khatam hoga , phir uske baad hi uss function ka code run hoga
*/