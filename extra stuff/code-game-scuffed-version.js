import { cards } from "../cards.js"; // cards är en array av objekt! Objekten innehåller info om respektive kort.
const gameEl = document.getElementById("game");

// see question 5
let lastCard = NaN; // computer now knows this is a number variable?
const lastCardEl = document.createElement("div");
gameEl.appendChild(lastCardEl);
lastCardEl.innerHTML = `num of last card: ${lastCard}`;

lastCardEl.style.position = "sticky";
lastCardEl.style.display = "flex";
lastCardEl.style.justifyContent = "center";
lastCardEl.style.alignItems = "center";
lastCardEl.style.height = "30px";
lastCardEl.style.backgroundColor = "grey"
lastCardEl.style.color = "white"
lastCardEl.style.top = "20px";

// 1. Med forEach Lägg till en property showing: false till varje kort. Detta kommer att användas för att hålla reda på om kortet är visas eller inte.
cards.forEach( (card) => { // gå igenom ett kort i taget
  card.showing = "false"; // vi lägger alltså till showing som en key i varje card-objekt!
});
console.log(cards); // FUNKAR INTE MED TERMINAL, KOLLA DEVTOOLS ISTÄLLET.

// 2. Skapa en funktion createCard. Som tar ett card-objekt och ett index som input och skapar
// ett img element och lägger till det på sidan i gameEl. Gör så här:
// - skapa ett ett img-element med document.createElement("img")
// - sätt attribut med setAttribute på img-elementet ange tex:
//    imgElement.setAttrubut("src", "images/backside.png") för baksidan på kortet.
//    om card.showing är true använd card.file annars använd images/backside.png
// - lägg till width och height till imgElementet
//    width ska vara 100 och height ska vara 145
// - lägg till id = index på card elementet så att du kommer åt det senare
// - använd appendChild för att lägga till kortet till gameEl
function createCard( card, index ) {
  const newImgElement = document.createElement("img");

  // this is how the cards will look when entering the page!
  if (card.showing == "true" ) {
    newImgElement.setAttribute("src", "images/" + card.file ); // file finns i objektet... se cards.js 
  } else {
    newImgElement.setAttribute("src", "images/backside.png") // baksidan av kortet.
  } 

  // when we click on image we change the "showing" property... and the image source... 
  newImgElement.addEventListener("click", ( (e) => {
    const element = e.target; // info about clickevent
    console.log(card.num);

    if (card.showing === "false" && ( lastCard == card.num || lastCard == NaN)) {
      card.showing = "true";
      element.setAttribute("src", "images/" + card.file);
      /* if ( !(lastCard == card.num) ){
        cards.forEach(card => {
          card.showing = "false";
          element.setAttribute("src", "images/backside.png");
        });
      } */
    } else {
      card.showing = "false";
      element.setAttribute("src", "images/backside.png");
      if ( !(lastCard == card.num || lastCard == NaN )) {
        alert("Card number does not match!")
        cards.forEach(card => {
          card.showing = "false";
          card.setAttribute("src", "images/backside.png");
        });
      }
    }

    // delay this check by 1000ms so we have time to see the card...
    /* setTimeout( () => {
      if ( !(lastCard == card.num) ){
        cards.forEach(card => {
          card.showing = "false";
          element.setAttribute("src", "images/backside.png");
        });
      }
    }, 1000); */
    lastCard = card.num; // question 5... lastCard seems like an unnecessary variable at this location (could just use card.num here)? Unless I want to use it somewhere else later I guess...
    lastCardEl.innerHTML = `num of last card: ${lastCard}`;
  }));

  newImgElement.style.width = "100px";
  newImgElement.style.height = "145px";
  newImgElement.setAttribute("id", index)

  gameEl.appendChild(newImgElement);
}

// 3. Använd for-loop eller forEach för att loopa igenom alla cards och anrop funktionen
//    createCard med varje kort och varje index (i). Nu ska alla kort synas på sidan
for (let i = 0; i < cards.length; i++) { // kom ihåg att cards är en array av objekt!
  createCard( cards[i], i);
}

// 4. Lägg till addEventListner på korten i funktionen createCard. När man klickar ska
// kortet ändras från showing: false till showing:true

  // see line 38

// 5 Använd en global variabel lastCard och lastCardEl för att hålla reda på vilket kort man klickade på senast
// kolla när man klickar på ett kort om det har samma värde som lastCard (card.num)

  // see line 40

// 6 (Ganska svårt) FÅ ihop hela spelet med det du skrivit ovan.
