import { cards } from "./cards.js"; // cards är en array av objekt! Objekten innehåller info om respektive kort.
let gameRestarting = false; 
const gameEl = document.getElementById("game");

// see question 5
let lastCard = 0; // computer now knows this is a number variable?
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

// start game with shuffled cards...
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
  //const element = e.target; // info about clickevent
  //cardImgElArray.sort( () => Math.random() - 0.5 ); // mutates the original array! */
  console.log("Shuffle button clicked");
  shuffleCards(); 
});

const searchContainer = document.createElement("div");
topBar.appendChild(searchContainer);
const searchBar = document.createElement("input");
searchBar.placeholder = "search card number";
searchContainer.appendChild(searchBar);
const searchButton = document.createElement("button");
searchContainer.appendChild(searchButton);
searchButton.textContent = "Search";

searchButton.addEventListener("click", () => {
  const userInput = searchBar.value; //parseInt() doesnt work here? because in eventlistener?
  showCards(userInput);  
})

// should have done more than one function... this function is very long... mainly due to to the addEventListener
function createCard( card, index ) {
  const newImgElement = document.createElement("img");

  // this is how the cards will look when entering the page!
  if (card.showing == "true" ) {
    newImgElement.setAttribute("src", "images/" + card.file ); // file finns i objektet... se cards.js 
  } else {
    newImgElement.setAttribute("src", "images/backside.png") // baksidan av kortet.
  } 

  // before, when shuffling didnt work, we assigned a click listener here that made a card "turn around" and show the card. However, it was using the .card we have in the input here (createCard), it did not take in consideration that the cards could be shuffled. Now, below we have a listener that calls the current clicked element, rather than the start/default-value!

  // function without () means that it is only called when the click event occurs (i.e. not handleCardClick() )
  newImgElement.addEventListener("click", function () {
    if (!gameRestarting) {
      handleCardClick.call(this); // 'this' keeps track of the clicked element, even after shuffling! 
    }
  });

  newImgElement.style.width = "100px";
  newImgElement.style.height = "145px";
  newImgElement.setAttribute("id", index)

  /* gameEl.appendChild(newImgElement); */
  return newImgElement;  // return so we can store the imgElement and change it later if we want!
}

// function inside a function... just so we can access same variables easily...
function handleCardClick() {

  const element = this; // Use 'this' to refer to the clicked element
  const index = parseInt(element.getAttribute("id"));
  const card = cards[index];

  if (card.showing === "false" && ( lastCard == card.num || lastCard == 0)) {
    card.showing = "true";
    element.setAttribute("src", "images/" + card.file);
  } else { 
    card.showing = "false";
    element.setAttribute("src", "images/backside.png");
    // I tried placing this in an 'else-if' above 'else' but didnt work
    if ( ( !(lastCard == card.num) || !(lastCard === 0) )) {
      element.setAttribute("src", "images/" + card.file);
      alert("Card number does not match! Restarting game...");
      lastCardEl.innerHTML = `Starting new game...`;
      gameRestarting = true; // see line 88...
      lastCard = 0;
      setTimeout( () => { // just so we have time to see the card we clicked on before restarting the game...!
        lastCardEl.innerHTML = `New game!`;
        cardImgElArray.forEach(cardImg => { // CHANGE ALL IMG ELEMENTS TO BACKSIDE
          cardImg.setAttribute("src", "images/backside.png");
        });
        gameRestarting = false;
      }, 3000); 
    }
  }

  if ( gameRestarting === false) {
    lastCard = card.num;
    lastCardEl.innerHTML = `number of last card: ${lastCard}. <br> Find cards with matching number!`; 
  } else {
    lastCard = 0;
  }
}

function shuffleCards() {
  console.log("Shuffling cards...");
  // Reset the gameRestarting variable
  lastCard = 0;
  gameRestarting = false;
  //wrongClickCount = 0;

    // Reset the showing property of each card to "false"
 cards.forEach((card) => {
   card.showing = "false";
 });

 // shuffles the ORIGINAL array... I was not able to shuffle the cardImgElArray...
 for (let i = cards.length - 1; i > 0; i--) {
   let j = Math.floor(Math.random() * (i + 1));
   [cards[i], cards[j]] = [cards[j], cards[i]];
 }
 /* console.log(cards); */
 // Update cardImgElArray with the new order
 cardImgElArray.forEach((cardImg, index) => {
   const card = cards[index];
   // note that all have card.showing = "false" here... But we just want this logic... so when we CLICK on cards (changing from false to true) we get this new image!
   if (card.showing == "true" ) {
     cardImg.setAttribute("src", "images/" + card.file);
   } else {
     cardImg.setAttribute("src", "images/backside.png");
   }
 });

 /* console.log(cardImgElArray); */

}

function showCards(cardNumber) {
  cards.forEach((card) => {
    if ( card.num == cardNumber ){
      card.showing = "true";
    }
  })
    // doesnt work in eventlistener?
   /*  if (!Number.isInteger(userInput)) {
    alert("Card Numbers are integers between 1 and 10.");
  } else {
  } */
  // apropå annat: Try/catch is an overhead cost that will slow down responsiveness of your site... don't use?

 // Update cardImgElArray with specific card.num showing!
  cardImgElArray.forEach((cardImg, index) => {
    const card = cards[index];
    // note that all have card.showing = "false" here... But we just want this logic... so when we CLICK on cards (changing from false to true) we get this new image!
    if (card.showing == "true" ) {
      cardImg.setAttribute("src", "images/" + card.file);
    } else {
      cardImg.setAttribute("src", "images/backside.png");
    }
  });
}










// ---- don't work.... :

/* function shuffleCardsNow () {
  for (let i = cardImgElArray.length - 1; i > 0; i--) { 
    let j = Math.floor(Math.random() * (i + 1)); 
    [cardImgElArray[i], cardImgElArray[j]] = [cardImgElArray[j], cardImgElArray[i]]; 
    
    gameEl.insertBefore(cardImgElArray[i], cardImgElArray[i].nextSibling);
  } 

    // Reassign event listeners after shuffling
    cardImgElArray.forEach((cardImg, index) => {
      cardImg.removeEventListener("click", null); // Remove existing listeners
      const card = cards[index];
      cardImg.addEventListener("click", (e) => {
        // Your existing click event handling logic
      });
    });
} */



 function shuffleCardsNow2() {
  for (let i = cardImgElArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [cardImgElArray[i], cardImgElArray[j]] = [cardImgElArray[j], cardImgElArray[i]];
    gameEl.insertBefore(cardImgElArray[i], cardImgElArray[i].nextSibling);
  }

  // Reassign event listeners after shuffling
  cardImgElArray.forEach((cardImg, index) => {
    cardImg.removeEventListener("click", null); // Remove existing listeners
    createCard(cards[index], index); // Create a new card with event listeners
  });
} 