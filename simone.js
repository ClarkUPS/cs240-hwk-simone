

/*Event listeners*/
var boxSelectTint = document.querySelectorAll("div");

for (let a = 0; a < 4; a++) {
    boxSelectTint[a].addEventListener("mouseover", function () {
        boxSelectTint[a].classList.add("hover");
        
    
    });
    
    boxSelectTint[a].addEventListener("mouseout", function () {
     
        boxSelectTint[a].classList.remove("hover");

    });
}

var playButton = document.querySelector("button");
playButton.addEventListener("click", function () {
    //TODO add the into sequence
    //TODO make request based on user round input
    
    
    playGame(sampleInput);
});




//intro sequence stuff up here



async function playGame(colorList){   //play game and input array of colors to play 
    //main game for loop

    await showPattern() //plays the welcome pattern

    await timeout(4000) //4 second timeout before the start of the game

    for (let a = 0; a < colorList.length; a++) {
        alert("Round: " + (a+1));
        await showPattern(colorList.slice(0, a+1), 120, 400); //need to add so the slice works
        let pass = await testMemory(colorList.slice(0, a + 1));

        if (pass == false) {
           console.log("you fail");
            break;
        }
        //testMemory(colorList.slice(0, a));

        
    }

}
/*Function that displays a pattern given inputs*/
async function showPattern(subList, blinkTime, spaceingTime) { 
    
    let boxSelect = document.querySelectorAll("div"); //should I reuse the select from earlier?
    
    for (let a = 0; a < subList.length; a++) {
        if (subList[a] == "red") {
            boxSelect[0].classList.add("lightred");
            await timeout(blinkTime);
            boxSelect[0].classList.remove("lightred")
        }else if (subList[a] == "blue") {
            boxSelect[1].classList.add("lightblue");
            await timeout(blinkTime);
            boxSelect[1].classList.remove("lightblue")
        } else if (subList[a] == "green") {
            boxSelect[2].classList.add("lightgreen");
            await timeout(blinkTime);
            boxSelect[2].classList.remove("lightgreen")
        } else {
            boxSelect[3].classList.add("lightyellow");
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


async function guess() {
    
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

const sampleInput = [ "red" ,"blue" ,"green","yellow",];
//playPreview(sampleInput);
