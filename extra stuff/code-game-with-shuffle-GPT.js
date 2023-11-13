import { cards } from "../cards.js"; // cards är en array av objekt! Objekten innehåller info om respektive kort.
const gameEl = document.getElementById("game");

//let wrongClickCount = 0; // variable to keep track of wrong clicks
/* let firstClick = true;  */// Variable to track the first click of a game

// see question 5
let lastCard = 0; // computer now knows this is a number variable?
let gameRestarting = false; 
const topBar = document.createElement("div");
gameEl.appendChild(topBar);

topBar.style.position = "sticky";
topBar.style.display = "flex";
topBar.style.flexDirection = "row";
topBar.style.alignItems = "center"
topBar.style.justifyContent = "space-around"
topBar.style.height = "45px";
topBar.style.backgroundColor = "grey"
topBar.style.color = "white"
topBar.style.top = "20px";

const lastCardEl = document.createElement("p");
topBar.appendChild(lastCardEl);
/* lastCardEl.innerHTML = `New game!`; */
lastCardEl.innerHTML = `New game!`;
lastCardEl.alignSelf = "end";

cards.forEach( (card) => { // gå igenom ett kort i taget
  card.showing = "false"; // vi lägger alltså till showing som en key i varje card-objekt!
});
console.log(cards); // FUNKAR INTE I TERMINALEN, KOLLA DEVTOOLS ISTÄLLET

// shuffle cards
/* for (let i = cards.length - 1; i > 0; i--) { 
  let j = Math.floor(Math.random() * (i + 1)); 
  [cards[i], cards[j]] = [cards[j], cards[i]]; 
}  */

let cardImgElArray = []; // We will store the imgElements so we can change them when we want! Otherwise we just create imgElements without being able to change them later on...!
for (let i = 0; i < cards.length; i++) { // kom ihåg att cards är en array av objekt!
  let cardImg = createCard( cards[i], i);
  cardImgElArray.push(cardImg);

  gameEl.appendChild(cardImgElArray[i]);
}


const newShuffleButton = document.createElement("button");
topBar.appendChild(newShuffleButton);
newShuffleButton.innerHTML = "Shuffle";


newShuffleButton.addEventListener("click", () => {
  
  shuffleCardsNow2(); 
});

// should have done more than one function... this function is very long... mainly due to to the addEventListener
function createCard(card, index) {
  const newImgElement = document.createElement("img");

  if (card.showing === "true") {
    newImgElement.setAttribute("src", "images/" + card.file);
  } else {
    newImgElement.setAttribute("src", "images/backside.png");
  }

  newImgElement.style.width = "100px";
  newImgElement.style.height = "145px";
  newImgElement.setAttribute("id", index);

  // Add click event listener directly here
  // newImgElement.addEventListener("click", handleCardClick);
  newImgElement.addEventListener("click", function () {
    if (!gameRestarting) {
      handleCardClick.call(this);
      // handleCardClick function uses the call method to set the context (this) to the clicked element.
    }
  });


  return newImgElement;
}

function shuffleCardsNow2() {
   // Reset the gameRestarting variable
   lastCard = 0;
   gameRestarting = false;
   //wrongClickCount = 0;

     // Reset the showing property of each card to "false"
  cards.forEach((card) => {
    card.showing = "false";
  });

  for (let i = cards.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  // Update cardImgElArray with the new order
  cardImgElArray.forEach((cardImg, index) => {
    const card = cards[index];
    if (card.showing === "true") {
      cardImg.setAttribute("src", "images/" + card.file);
    } else {
      cardImg.setAttribute("src", "images/backside.png");
    }
  });

}


function handleCardClick() {
  const element = this; // Use 'this' to refer to the clicked element
  const index = parseInt(element.getAttribute("id"));

  const card = cards[index];

  if (gameRestarting) {
    // If the game is restarting, reset lastCard to 0
    gameRestarting = false;
    /* firstClick = true; */
   // lastCard = card.num; // Set lastCard to the card.num of the first card clicked
   lastCard = 0;
  }

  console.log(lastCard);
  if (card.showing === "false" && (lastCard == card.num || lastCard == 0)) {
    card.showing = "true";
    element.setAttribute("src", "images/" + card.file);
   /*  if (firstClick) {
      // Set lastCard to the first card clicked
      lastCard = card.num;
      firstClick = false; // Update firstClick after the first click
    } */
  } else {
    card.showing = "false";
    element.setAttribute("src", "images/backside.png");

    if (!(lastCard == card.num) || !(lastCard === 0)) {
      element.setAttribute("src", "images/" + card.file);
     /*  wrongClickCount++;
 */
      /* if (wrongClickCount >= 2) { */
        alert("Card number does not match! Restarting game...");
        lastCardEl.innerHTML = `Starting new game...`;
        gameRestarting = true; // see line 74...
        /* firstClick = true; */

        setTimeout(() => {
          lastCardEl.innerHTML =
          `New game!`;

          cardImgElArray.forEach((cardImg) => {
            cardImg.setAttribute("src", "images/backside.png");
          });
          gameRestarting = false;
          /* wrongClickCount = 0; */
        }, 3000);
      /* } */
    }
  }

  //if (!gameRestarting && !firstClick) {
  if (!gameRestarting) {
    /* lastCard = card.num; */
     lastCard = card.num; 
    lastCardEl.innerHTML = `number of last card: ${lastCard}. <br> Find cards with matching number!`;
  } else {
    lastCard = 0;
  }
}

// ... (rest of your code)


// ... (rest of your code)