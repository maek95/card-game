import { cards } from "./cards.js"; // cards är en array av objekt! Objekten innehåller info om respektive kort.
const gameEl = document.getElementById("game");

// see question 5
let lastCard = 0; // computer now knows this is a number variable?
const lastCardEl = document.createElement("div");
gameEl.appendChild(lastCardEl);
lastCardEl.innerHTML = `New game!`;

lastCardEl.style.position = "sticky";
lastCardEl.style.display = "flex";
lastCardEl.style.justifyContent = "center";
lastCardEl.style.alignItems = "center";
lastCardEl.style.height = "45px";
lastCardEl.style.backgroundColor = "grey"
lastCardEl.style.color = "white"
lastCardEl.style.top = "20px";

cards.forEach( (card) => { // gå igenom ett kort i taget
  card.showing = "false"; // vi lägger alltså till showing som en key i varje card-objekt!
});
console.log(cards); // FUNKAR INTE I TERMINALEN, KOLLA DEVTOOLS ISTÄLLET

// if we want to shuffle cards before we start...
// shuffle cards
/* for (let i = cards.length - 1; i > 0; i--) { 
  let j = Math.floor(Math.random() * (i + 1)); 
  [cards[i], cards[j]] = [cards[j], cards[i]]; 
}  */

let cardImgElArray = []; // We will store the imgElements so we can change them when we want! Otherwise we just create imgElements without being able to change them later on...!
for (let i = 0; i < cards.length; i++) { // kom ihåg att cards är en array av objekt!
  const cardImg = createCard( cards[i], i);
  cardImgElArray.push(cardImg);

  gameEl.appendChild(cardImg);
}


// should have done more than one function... this function is very long... mainly due to to the addEventListener
function createCard( card, index ) {
  const newImgElement = document.createElement("img");

  // this is how the cards will look when entering the page!
  if (card.showing == "true" ) {
    newImgElement.setAttribute("src", "images/" + card.file ); // file finns i objektet... se cards.js 
  } else {
    newImgElement.setAttribute("src", "images/backside.png") // baksidan av kortet.
  } 

  let gameRestarting = false; // see line 71...
  // when we click on image we change the "showing" property... and the image source... 
  newImgElement.addEventListener("click", ( (e) => {
    const element = e.target; // info about clickevent
    console.log(card.num);

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
        gameRestarting = true; // see line 74...
        setTimeout( () => { // just so we have time to see the card we clicked on before restarting the game...!
          lastCardEl.innerHTML = `New game!`;
          cardImgElArray.forEach(cardImg => { // CHANGE ALL IMG ELEMENTS TO BACKSIDE
            cardImg.setAttribute("src", "images/backside.png");
          });
        }, 3000); 
      }
    }

    if ( gameRestarting === false) {
      lastCard = card.num;
      lastCardEl.innerHTML = `number of last card: ${lastCard}. <br> Find cards with matching number!`; 
    } else {
      lastCard = 0;
    }
  }));

  newImgElement.style.width = "100px";
  newImgElement.style.height = "145px";
  newImgElement.setAttribute("id", index)

  /* gameEl.appendChild(newImgElement); */
  return newImgElement;  // return so we can store the imgElement and change it later if we want!
}
