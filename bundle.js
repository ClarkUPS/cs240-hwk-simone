(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//const { default: axios } = require("axios");

//const { default: axios } = require("axios");

/*instance vairables*/
var roundNumber; //current round number
var roundUp; //number of clicks till round number
var allowInput = false; //to prevent cheeting
var gameSequence;

// if (currentInput == "redSq") {
        //     currentInput = "R"

        // } else if (currentInput == "blueSq") {
        //     currentInput = "B"
        // } else if (currentInput == "greenSq") {
        //     currentInput = "G"
        // } else {
        //     currentInput = "Y"
        // }



/*Event listeners*/
var boxSelectTint = document.querySelectorAll("div");
for (let a = 0; a < 4; a++) {
    boxSelectTint[a].addEventListener("mouseover", function() {
        boxSelectTint[a].classList.add("hover");


    });

    boxSelectTint[a].addEventListener("mouseout", function() {

        boxSelectTint[a].classList.remove("hover");

        let boxSelect = document.querySelectorAll("div");

        let currentInput = boxSelectTint[a].id

        if (currentInput == "redSq") {
            boxSelect[0].classList.remove("lightred");
        } else if (currentInput == "blueSq") {
            boxSelect[1].classList.remove("lightblue");
        } else if (currentInput == "greenSq") {
            boxSelect[2].classList.remove("lightgreen");
        } else {
            boxSelect[3].classList.remove("lightyellow");
        }

    });

    boxSelectTint[a].addEventListener("mousedown", function() {
        if (allowInput == true) {
            let boxSelect = document.querySelectorAll("div");

            let currentInput = boxSelectTint[a].id

        

            if (currentInput == "redSq") {
                boxSelect[0].classList.add("lightred");
            } else if (currentInput == "blueSq") {
                boxSelect[1].classList.add("lightblue");
            } else if (currentInput == "greenSq") {
                boxSelect[2].classList.add("lightgreen");
            } else {
                boxSelect[3].classList.add("lightyellow");
            }
        }

    });

    //roundNumber = current round number
    boxSelectTint[a].addEventListener("mouseup", async function() {

        if (allowInput == true) { //TODO

            let boxSelect = document.querySelectorAll("div");

            let currentInput = boxSelectTint[a].id




            console.log(currentInput); //remove

            

            if (currentInput == gameSequence[roundUp]) {

                if (currentInput == "redSq") {
                    boxSelect[0].classList.remove("lightred");
                    let audio = new Audio("sounds/red.wav");
                    audio.play();
                    console.log("here")
                } else if (currentInput == "blueSq") {
                    boxSelect[1].classList.remove("lightblue");
                    let audio = new Audio("sounds/blue.wav");
                    audio.play();
                } else if (currentInput == "greenSq") {
                    boxSelect[2].classList.remove("lightgreen");
                    let audio = new Audio("sounds/green.wav");
                    audio.play();
                } else {
                    boxSelect[3].classList.remove("lightyellow");
                    let audio = new Audio("sounds/yellow.wav");
                    audio.play();
                }


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
playButton.addEventListener("click", async function() {
    //for my sanity


    document.body.style.backgroundColor = "black";
    roundNumber = 0; //need to reset everthing upon starting

    let wS = await welcomeSequence(); //get and play welcome
    console.log("the returned sequence: ")
    console.log(wS)
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


    try {
        console.log("first")
        let request = await axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start")
        request = request.data.sequence;
        console.log(request);

        //convert to readable sequence.
        for (let a = 0; a < request.length; a++) {
            if ( request[a] == "R") {
                    request[a] = "redSq"
        
                } else if (request[a] == "B") {
                    request[a] = "blueSq"
                } else if (request[a] == "G") {
                    request[a] = "greenSq"
                } else {
                    request[a] = "yellowSq"
                }

        }
        console.log("new")
        console.log(request);

        return request;
    } catch (error) {
        console.log(error);
    }


    

    
   

}

async function getgameSequence() { //api request for random sequnce of n length #HELP

    let roundCount = document.querySelector('input[type ="text"]')
    roundCount = roundCount.value

    roundCount = Math.floor(roundCount); //don't allow for partial numbers

    if (roundCount <= 0) { //make sure no negative numbers get though
        roundCount = 10
    }

    try {
        let link = ("https://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=" + roundCount)
        let request = await axios.get(link);
        console.log(request);
        request = request.data.key;

        //convert to readable sequence.
        for (let a = 0; a < request.length; a++) {
            if ( request[a] == "R") {
                    request[a] = "redSq"
        
                } else if (request[a] == "B") {
                    request[a] = "blueSq"
                } else if (request[a] == "G") {
                    request[a] = "greenSq"
                } else {
                    request[a] = "yellowSq"
                }

        }


        console.log("current test sequence: ");
        console.log(request);
        return request;
    } catch (error) {
        console.log(error)
    }
    
    

  

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
        } else if (subList[a] == "blueSq") {
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

async function nextRound() {
    let status = document.getElementById("status")
    status.innerHTML = "Good job! Prepare for next round."

    let audio = new Audio("sounds/nextRound.wav")
    audio.play();

    await timeout(800);

    status.innerHTML = ("Round: " + roundNumber + " out of " + gameSequence.length);

    await timeout(800);
}


/*Custom time out function to add delay*/
async function timeout(time) { //delays by set time
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, time) //takes custom time now
    );
}


//playGame(sampleInput);\

const sampleInput = ["redSq", "greenSq", "yellowSq"];

//const sampleIntro = ["R", "B", "G", "Y"];

//#HELP download/import packages
//#HELP api stuff
//stop sound!
},{}]},{},[1]);
