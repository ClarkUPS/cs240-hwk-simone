

/*Event listeners*/

async function buttonPress(){
var boxSelectTint = document.querySelectorAll("div");
for (let a = 0; a < 4; a++) {
    boxSelectTint[a].addEventListener("mouseover", function () {
        boxSelectTint[a].classList.add("hover");
        
    
    });
    
    boxSelectTint[a].addEventListener("mouseout", function () {
     
        boxSelectTint[a].classList.remove("hover");

    });

    //if clicked #HELP
}
}

var playButton = document.querySelector("button");
playButton.addEventListener("click", async function () {
    //for my sanity
    document.body.style.backgroundColor = "black";
    
    let wS = await welcomeSequence();
    
    let gS = await gameSequence();
    
    playGame(wS , gS);
});

async function welcomeSequence() { //Finish
    
    //return request
    //TEMP
    return sampleIntro;

}

async function gameSequence() {
    
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




//intro sequence stuff up here



async function playGame(welcomeSequence , colorList) {   //play game and input array of colors to play 
    //main game for loop

    await showPattern(welcomeSequence, 120, 120) //plays the welcome pattern

    await timeout(3000) //4 second timeout before the start of the game

    let sucsess = true;

    //Main game loop
    for (let a = 0; a < colorList.length; a++) {
    
        await showPattern(colorList.slice(0, a + 1), 120, 400); //need to add so the slice works
        
        let pass = await testMemory(colorList.slice(0, a + 1));

        if (pass == false) {
            sucsess = false
            await fail();
            break;//break out of the game for loop
        }
       
        await sucsessUpdateBoard(a, colorList.length);
        
    
    }

    //Sucsess update if the player never failed a single time.
    if (sucsess == true) { 
        document.body.style.backgroundColor = "DeepSkyBlue"; //change background

        let audio = new Audio("sounds/win.mp3");
        audio.play();

        let vText = document.getElementById("status");
        vText.innerHTML = ("Yay you win!");

    }
}

/*Function that plays fail sounds and changes the screen*/
async function fail() {
    //plays sounds
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
    
    let boxSelect = document.querySelectorAll("div"); //should I reuse the select from earlier?
    
    for (let a = 0; a < subList.length; a++) {
        if (subList[a] == "red") {
            boxSelect[0].classList.add("lightred");
            let audio = new Audio("sounds/red.wav");
            audio.play();
            await timeout(blinkTime);
            boxSelect[0].classList.remove("lightred")
        }else if (subList[a] == "blue") {
            boxSelect[1].classList.add("lightblue");
            let audio = new Audio("sounds/blue.wav");
            audio.play();
            await timeout(blinkTime);
            boxSelect[1].classList.remove("lightblue")
        } else if (subList[a] == "green") {
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
}

/*Function which tests the player on the correct color order sublist*/
async function testMemory(sublist) {
    let correctGuess = true;
    
    for (let a = 0; a < sublist.length; a++) {
        console.log("number of elements " + sublist.length);
        userGuess = await guess();

        if (userGuess != sublist[a]){
            correctGuess = false;
            break;
        }

       



    }
    return correctGuess;
}

async function sucsessUpdateBoard(round, totalRound){
       let status = document.getElementById("status")
       status.innerHTML = "Good job! Prepare for next round."

       let audio = new Audio("sounds/nextRound.wav")
       audio.play();
       
       await timeout(800);

       status.innerHTML = ("Round: " + (round + 1) + " out of " + totalRound);
}

async function guess() { //Make this button based #HELP
    await buttonPress(); //make this only go when it's the players turn to guess. Some sort of time out
    let guess = prompt("guess a color");
    return guess;

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

const sampleInput = ["red", "blue"];

const sampleIntro = ["red", "blue", "green", "yellow"];

//#HELP download/import packages
//#HELP api stuff
//