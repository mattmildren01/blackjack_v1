// Access HTML
let cardOne = document.getElementById("firstCard")
let cardSum = document.getElementById("sumCards")

let houseCardOne = document.getElementById("houseFirstCard")
let sumHouseCard = document.getElementById("sumHouseCard")

let winMessage = document.getElementById("results")

// Random number generator
function getRandomNumber(min,max) { 
    return Math.floor(Math.random()*(max-min+1))+min;
}


let playerCards = []
let houseCards = [] 
let playerCardDisplay = ""
let houseCardsDisplay = ""

let sum = 0
let houseSum = 0
let alive = false;
let active_game = false;

// reset card values
function new_game(){
    playerCards = []
    houseCards = [] 
    playerCardDisplay = ""
    houseCardsDisplay = ""
    sum = 0
    houseSum = 0
    alive = true;
    active_game = true;
    console.log("Check")
}

function playGame() {
    // Set player alive function to True
    if (alive){
        console.log("Active Game - Can not stop")
        winMessage.innerText = "Active Game - Can Not Stop";
    } else {
        console.log("Starting New Game")
        active_game = true
        new_game()

        // Generate cards using random values (better to create an artificial deck and pop from that)
        playerCards.push(getRandomNumber(2, 11))
        playerCards.push(getRandomNumber(2, 11))
        houseCards.push(getRandomNumber(2, 11))
        houseCards.push(getRandomNumber(2, 11))

        // Sum deck hands 
        for (let i = 0; i< playerCards.length;i++) {
            playerCardDisplay = playerCards.join(" - ");
            sum += playerCards[i]
        }
        for (let i = 0; i< houseCards.length;i++) {
            houseCardsDisplay = houseCards.join(" - ");
            houseSum += houseCards[i]
        }

        // Display card values
        alive = true
        cardOne.innerText = "First Card: " + playerCardDisplay;
        houseCardOne.innerText =  "First Card: " + houseCardsDisplay[0] + " - " + "**";
        sumCards.innerText = "Sum: " + sum;
        sumHouseCard.innerText = "Sum: " + "**";
        resultMsg(sum)
    }
    
}

function hitCards(){
    console.log("ERROR" + active_game +" - " + alive)
    if (active_game){
        if (alive){
            playerCards.push(getRandomNumber(2, 11))
            playerCardDisplay = playerCards.join(" - ");
            sum += playerCards[playerCards.length-1]

            cardOne.innerText = "First Card: " + playerCardDisplay;
            sumCards.innerText = "Sum: " + sum;
            resultMsg(sum)
        }
    } else {
        winMessage.innerText = "Select Play"
    }
}

function resultMsg(summed){
    if (summed < 21){
        alive = true
        winMessage.innerText = "Would you like to hit?"
    } else if (summed === 21){
        alive = false
        standCard()
        active_game = false
    } else if (summed > 21){
        alive = false
        standCard() 
        active_game = false
    }
}

function standCard(){

  while (houseSum < 17) {
    houseCards.push(getRandomNumber(2, 11))
    houseSum += houseCards[houseCards.length-1]
  }
  houseCardsDisplay = houseCards.join(" - ");
  houseCardOne.innerText =  "First Card: " + houseCardsDisplay;
  sumHouseCard.innerText =  "Sum: " + houseSum;
  endGame()
}



function endGame(){
    if (houseSum < sum && alive) {
        winMessage.innerText = "WINNER!";
        active_game = false
        alive = false
    } else if (houseSum === sum && alive) {
        winMessage.innerText = "PUSH";
        active_game = false
        alive = false
    } else if (houseSum > 21 && alive){
        winMessage.innerText = "WINNER";
        active_game = false
        alive = false
    }
    else {
        winMessage.innerText = "LOST";
        active_game = false
        alive = false
    }
    
}
