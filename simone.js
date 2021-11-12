
/*instance vairables*/
var roundNumber; //current round number
var roundUp; //number of clicks till round number
var allowInput = false; //to prevent cheeting
var gameSequence;


/*Event listeners*/

var boxSelectTint = document.querySelectorAll("div");
for (let a = 0; a < 4; a++) {
    boxSelectTint[a].addEventListener("mouseover", function () {
        boxSelectTint[a].classList.add("hover");
        
    
    });
    
    boxSelectTint[a].addEventListener("mouseout", function () {
     
        boxSelectTint[a].classList.remove("hover");

    });

    boxSelectTint[a].addEventListener("mousedown", function () {
       //new listener
    });

    //roundNumber = current round number
    boxSelectTint[a].addEventListener("mouseup", async function () {
        
        if (allowInput == true) { //TODO
        
            let currentInput = boxSelectTint[a].id
            console.log(currentInput); //remove
            
    
            if (currentInput == gameSequence[roundUp]) {
                console.log("sucsess")

                let status = document.getElementById("status")
                
                roundUp++ //if correct next round!

                status.innerHTML = ("So far so good! " + (roundNumber - roundUp) + " more to go!");

                console.log("round up: " + roundUp) //Remove
                console.log("out of: " + gameSequence.length) //Remove

                 if (roundUp == gameSequence.length) {
                     sucsess();
                } else {
                    
                    
                

                    if (roundUp < roundNumber) { //subsequnce in round

                    //just accept inputs unless wrong

                } else { //new round
                    roundUp = 0
                    roundNumber++

                    await nextRound(); //next round update stuff!
                    console.log("here")
                    await showPattern(gameSequence.slice(0, roundNumber), 400, 400);
                }
                }
            } else {
            console.log("thats a fail")
            await fail()        
            }
                
        }
    
    });
    
}


var playButton = document.querySelector("button");
playButton.addEventListener("click", async function () {
    //for my sanity
    

    document.body.style.backgroundColor = "black";
    roundNumber = 0; //need to reset everthing upon starting
    
    let wS = await welcomeSequence(); //get and play welcome
    showPattern(wS, 120, 120)
    
    let gS = await getgameSequence(); //get and save game sequence
    gameSequence = gS; //save this up top
    

    await timeout(4000) //4 second timeout before the start of the game
    console.log(allowInput);
    //play the first clue and incrase round by one?
    await showPattern(gameSequence.slice(0, roundNumber + 1), 120, 400);
    roundNumber++
    roundUp = 0;
});

async function welcomeSequence() { //api random sequence request #HELP
    
    //return request
    //TEMP
    return sampleIntro;

}

async function getgameSequence() { //api request for random sequnce of n length #HELP
    
    let roundCount = document.querySelector('input[type ="text"]')
    roundCount = roundCount.value

    roundCount = Math.floor(roundCount); //don't allow for partial numbers

    if (roundCount <= 0) {  //make sure no negative numbers get though
        roundCount = 10
    }
    
    //request, save and return values
    //Format here too

    return sampleInput;
    
}


async function sucsess() {
    allowInput = false
    document.body.style.backgroundColor = "DeepSkyBlue"; //change background

        let audio = new Audio("sounds/win.mp3");
        audio.play();

        let vText = document.getElementById("status");
        vText.innerHTML = ("Yay you win!");
    
}

/*Function that plays fail sounds and changes the screen*/
async function fail() {
    //plays sounds
    allowInput = false; //do not allow any new inputs
    let audio = new Audio("sounds/wrong.wav");
    audio.play();
    audio = new Audio("sounds/lose.wav")
    audio.play();
    
    document.body.style.backgroundColor = "hotpink"; //change background

    let status = document.getElementById("status")
    status.innerHTML = ("Incorrect! You lose!");
}

/*Function that displays a pattern given inputs*/
async function showPattern(subList, blinkTime, spaceingTime) { 
    allowInput = false //do not allow to guess during pattern
    let boxSelect = document.querySelectorAll("div"); //should I reuse the select from earlier?
    
    for (let a = 0; a < subList.length; a++) {
        if (subList[a] == "redSq") {
            boxSelect[0].classList.add("lightred");
            let audio = new Audio("sounds/red.wav");
            audio.play();
            await timeout(blinkTime);
            boxSelect[0].classList.remove("lightred")
        }else if (subList[a] == "blueSq") {
            boxSelect[1].classList.add("lightblue");
            let audio = new Audio("sounds/blue.wav");
            audio.play();
            await timeout(blinkTime);
            boxSelect[1].classList.remove("lightblue")
        } else if (subList[a] == "greenSq") {
            boxSelect[2].classList.add("lightgreen");
            let audio = new Audio("sounds/green.wav");
            audio.play();
            await timeout(blinkTime);
            boxSelect[2].classList.remove("lightgreen")
        } else {
            boxSelect[3].classList.add("lightyellow");
            let audio = new Audio("sounds/yellow.wav");
            audio.play();
            await timeout(blinkTime);
            boxSelect[3].classList.remove("lightyellow")
        }
        await timeout(spaceingTime); //delay between rounds
    }
    allowInput = true //allow guess again
}



/*Function which tests the player on the correct color order sublist*/

async function nextRound(){
       let status = document.getElementById("status")
       status.innerHTML = "Good job! Prepare for next round."

       let audio = new Audio("sounds/nextRound.wav")
       audio.play();
       
       await timeout(800);

    status.innerHTML = ("Round: " + roundNumber + " out of " + gameSequence.length);
    
        await timeout(800);
}


/*Custom time out function to add delay*/
async function timeout(time){ //delays by set time
    await new Promise((resolve) =>
  setTimeout(() => {
    resolve(); 
  }, time) //takes custom time now
    );
}


//playGame(sampleInput);\

const sampleInput = ["redSq","redSq","greenSq"];

const sampleIntro = ["redSq", "blueSq", "greenSq", "yellowSq"];

//#HELP download/import packages
//#HELP api stuff
//stop sound!



