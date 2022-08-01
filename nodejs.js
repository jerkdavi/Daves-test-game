const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

const questions = ['name','age','job'];
let i = 0;

function ask(){
    if(questions.length != i){
        console.log('What is your ' + questions[i]);
        rl.prompt();
        i++;
    }
    else{
        console.log('Thanks for info');
        rl.close();
    }
}

ask();

rl.on('line',function(line){
    fs.appendFile('db.txt',line + "\n",function(err) {
        if(err) throw err;
        ask();
    })
})

rl.on('close',function() {
    fs.appendFileSync("db.txt","******************\n");

    try{
        const data = fs.readFileSync('db.txt','utf8');
        console.log(data);
    } catch(err){
        console.error(err);
    }
})
