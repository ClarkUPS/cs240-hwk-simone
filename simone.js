

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
    for (let a = 0; a < colorList.length; a++) {
        alert("Round: " + (a+1));
        await playPreview(colorList.slice(0, a+1)); //need to add so the slice works
        //testMemory(colorList.slice(0, a));

        
    }

}
/*Function that gives the preview of what the player needs to do*/
async function playPreview(subList) { 
    
    let boxSelect = document.querySelectorAll("div"); //should I reuse the select from earlier?
    
    for (let a = 0; a < subList.length; a++) {
        if (subList[a] == "red") {
            boxSelect[0].classList.add("lightred");
            await timeout(120);
            boxSelect[0].classList.remove("lightred")
        }else if (subList[a] == "blue") {
            boxSelect[1].classList.add("lightblue");
            await timeout(120);
            boxSelect[1].classList.remove("lightblue")
        } else if (subList[a] == "green") {
            boxSelect[2].classList.add("lightgreen");
            await timeout(120);
            boxSelect[2].classList.remove("lightgreen")
        } else {
            boxSelect[3].classList.add("lightyellow");
            await timeout(120);
            boxSelect[3].classList.remove("lightyellow")
        }
        await timeout(400); //delay between rounds
    }
}

/*Function which tests the player on the correct color order sublist*/

async function testMemory(sublist) {
    
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
