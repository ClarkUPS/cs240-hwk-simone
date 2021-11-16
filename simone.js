const { default: axios } = require("axios"); //axios call

/*instance vairables*/
var roundNumber; //current round number
var roundUp; //number of clicks till round number
var allowInput = false; //to prevent cheeting
var gameSequence;

/*Event listeners*/

/*Hover effect for mouse hover*/
var boxSelectTint = document.querySelectorAll("div");
for (let a = 0; a < 4; a++) {
    boxSelectTint[a].addEventListener("mouseover", function() {
        boxSelectTint[a].classList.add("hover");
    });

    //Mouse out unclect to remove effects
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

    //Highlight effect for mouse down 
    boxSelectTint[a].addEventListener("mousedown", function() {
        if (allowInput == true) {//allows inputs to go through or not. (stops cheating/misinputs)
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

    /*Color button listoners which runs the entire game*/
    boxSelectTint[a].addEventListener("mouseup", async function() {

        if (allowInput == true) { //allows inputs to go through or not. (stops cheating/misinputs)

            let boxSelect = document.querySelectorAll("div");

            let currentInput = boxSelectTint[a].id

            if (currentInput == gameSequence[roundUp]) {

                if (currentInput == "redSq") {
                    boxSelect[0].classList.remove("lightred");
                    let audio = new Audio("sounds/red.wav");
                    audio.play();
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

            

                if (roundUp == gameSequence.length) {
                    sucsess();
                } else {




                    if (roundUp < roundNumber) { //subsequnce in round

                        //just accept inputs unless wrong

                    } else { //new round
                        roundUp = 0
                        roundNumber++

                        await nextRound(); //next round update stuff!
                       
                        await showPattern(gameSequence.slice(0, roundNumber), 400, 400);
                    }
                }
            } else {
               
                await fail()
            }

        }

    });

}

/* Start button which starts the game*/
var playButton = document.querySelector("button");
playButton.addEventListener("click", async function() {
    //for my sanity

    document.body.style.backgroundColor = "black";
    roundNumber = 0; //need to reset everthing upon starting

    let wS = await welcomeSequence(); //get and play welcome
    showPattern(wS, 120, 120)

    let gS = await getgameSequence(); //get and save game sequence
    gameSequence = gS; //save this up top

    await timeout(4000) //4 second timeout before the start of the game
    

    //play the first clue and incrase round by one
    await showPattern(gameSequence.slice(0, roundNumber + 1), 120, 400);
    roundNumber++
    roundUp = 0; //make sure this begins reset
});

/*get the welcome sequene from api and process sequence*/
async function welcomeSequence() { 
//try and make the request for the welcome sequence
    try {
      
        let request = await axios.get("http://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=start")
        request = request.data.sequence;
    

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
        
        return request; //pass back the finished welcome array

    } catch (error) { //catch error
        console.log(error);
    }

}

/* Try to get the random game sequence from api*/
async function getgameSequence() { //api request for random sequnce of n length. Default length is 10
    let roundCount = document.querySelector('input[type ="text"]')
    roundCount = roundCount.value

    roundCount = Math.floor(roundCount); //don't allow for partial numbers

    if (isNaN(roundCount)) { //make sure non number inputs are not taken into account
        roundCount = 10;
    } else if (roundCount <= 0) { //make sure no negative numbers get though
        roundCount = 10
    }

    //get random sequence based of the input length n.

    try {
        let link = ("https://cs.pugetsound.edu/~dchiu/cs240/api/simone/?cmd=getSolution&rounds=" + roundCount)
        let request = await axios.get(link);
     
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

        return request; //return processed sequence

    } catch (error) { //catch error
        console.log(error)
    }

}

/*sucsess event changes*/
async function sucsess() {
    allowInput = false //no more color button inputs after game finished 
    document.body.style.backgroundColor = "DeepSkyBlue"; //change background

    let audio = new Audio("sounds/win.mp3");
    audio.play();

    let vText = document.getElementById("status");
    vText.innerHTML = ("Yay you win!");

}

/*Function that plays fail sounds and changes the screen*/
async function fail() {
    allowInput = false; //no more color button inputs after game finished 
   
    let audio = new Audio("sounds/wrong.wav");
    audio.play();

    audio = new Audio("sounds/lose.wav");
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



/*played in between rounds should a player input the correct sequence in a round */
async function nextRound() {
    allowInput = false; //don't want inputs now
    
    let status = document.getElementById("status")
    status.innerHTML = "Good job! Prepare for next round."

    let audio = new Audio("sounds/nextRound.wav")
    audio.play();

    await timeout(800); //delay for status start

    status.innerHTML = ("Round: " + roundNumber + " out of " + gameSequence.length);

    await timeout(800); //delay for status end

    allowInput = true; //inputs now allowed
}


/*Custom time out function to add delay*/
async function timeout(time) { //delays by set time
    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, time) //takes custom time now
    );
}