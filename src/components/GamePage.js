import Card from './Card';
import ScoreDisplay from './ScoreDisplay';
import pyramids from "../media/pictures/pyramids.jpg";
import taipei101 from "../media/pictures/taipei-101.jpg";
import goldenGateBridge from "../media/pictures/golden-gate-bridge.jpg";
import colloseum from "../media/pictures/colloseum.jpg";
import grandCanyon from "../media/pictures/grand-canyon.jpg";
import leaningTower from "../media/pictures/leaning-tower.jpg"
import eiffelTower from "../media/pictures/eiffel-tower.jpg";
import machuPichu from "../media/pictures/machu-pichu.jpg";
import mountFuji from "../media/pictures/mount-fuji.jpg";
import statueOfLiberty from "../media/pictures/statue-of-liberty.jpg";
import stBasils from "../media/pictures/st-basils-cathedral.jpg";
import westminsterPalace from "../media/pictures/westminster-palace.jpg";


import React, { useState, useEffect } from 'react';

function GamePage(props) {


  const [cards, setCards] = useState(
    [
      {file: pyramids, name: "The Pyramids", key: 0, picked: false},
      {file: taipei101, name: "Taipei 101", key: 1, picked: false},
      {file: goldenGateBridge, name: "Golden Gate Bridge", key: 2, picked: false},
      {file: colloseum, name: "The Colloseum", key: 3, picked: false},
      {file: leaningTower, name: "Leaning Tower of Pisa", key: 4, picked: false},
      {file: grandCanyon, name: "The Grand Canyon", key: 5, picked: false},
      {file: eiffelTower, name: "Eiffel Tower", key: 6, picked: false},
      {file: machuPichu, name: "Machu Pichu", key: 7, picked: false},
      {file: mountFuji, name: "Mount Fuji", key: 8, picked: false},
      {file: statueOfLiberty, name: "Statue of Liberty", key: 9, picked: false},
      {file: stBasils, name: "St. Basils", key: 10, picked: false},
      {file: westminsterPalace, name: "Westminster Palace", key: 11, picked: false},
      
    ]);

  const [cardsToPrint, setCardsToPrint] = useState(0);
  let [round, setRound] = useState(0);

  // useEffect executes on first render and each time [round] state is updated
  // It runs getCards
  useEffect(() => {

    let html = document.querySelector("html");
    html.style.backgroundImage = "url(./media/pictures/pyramids.jpg) no-repeat center center fixed";

    if (round === 0) {
      setCardsToPrint(getCards());
    } else {
      getCards();
    }
    
  },[round])
 
  // A helper function for getCards()
  // It returns an array of 4 cards. 
  // numPicked represents how many cards that have been picked should be returned
  // numUnpicked is how many cards that haven't been picked should be returned and displayed
  const chooseCards = (shuffledCards, numPicked, numUnpicked) => {

    console.log(shuffledCards);
    console.log("round", round);
    console.log("numPicked", numPicked);
    console.log("numUnpicked", numUnpicked);

    let newCards = [];
    for (let cardIndex = 0; (numPicked > 0 || numUnpicked > 0); cardIndex++) {
      if ((shuffledCards[cardIndex].picked === true) && (numPicked > 0)) {
        newCards.push(shuffledCards[cardIndex]);
        numPicked--;
      } else if ((shuffledCards[cardIndex].picked === false) && (numUnpicked > 0)) {
        newCards.push(shuffledCards[cardIndex]);
        numUnpicked--;
      }
    }

    return newCards;

  }
  
  // Given the round state, returns 4 random cards with a defined
  // Number of cards that have or haven't been picked yet
  const getCards = () => {
    /* For sort, if the callback returns > 0, a goes after b. Else, b goes after a.
    So with .5 - random, we get a 50/50 chances any element will go in front or behind
    Randomizing enough for our purposes of making the game not do the same thing every time */
    setCards(cards.sort(() => 0.5 - Math.random()));
    
    

    if (round === 0) {
      return (toJSX(chooseCards(cards, 0, 4))); 
    } else if (round > 0 && round < 5) {
      console.log("0 < round < 5");
      setCardsToPrint(toJSX(chooseCards(cards, 1, 3)));      
    } else if (round >= 5 && round < 12) {
      console.log("5 <= round <= 12")
      setCardsToPrint(toJSX(chooseCards(cards, 3, 1))); 
    } else if (round === 12) {
      resetCards();
      //setRound(0); Will set round after player hits 'play again'
    }

    
    
     
  }


  // Gots the the 'cards' state and marks a card picked: true
  // Called when a player clicks on a card
  function pickCard(cardName) {

    let updatedCards = cards.map((element) => {
      if (element.name === cardName) {
        element.picked = true;
        return element;
      } else {
        return element;
      }
    })

    setCards(updatedCards); 
  }

  // Check if card has been picked
  function checkPicked(card) {
    return (cards.find((element) => {
      if (element.name === card && element.picked === true) {
        return true;
      }
      
    }))
  }

  // Resets all cards to unpicked to restart the game when player loses
  function resetCards() {
    let tempCards = cards.map((element) => {
      element.picked = false;
      return element;
    })
    setCards(tempCards);
  }

  function onPlayAgainClick() {
    setRound(0);
  }

  // When a card is clicked on, we mark picked: true on that card
  // And then apply the logic for rendering the next round
  function onCardClick(event) {  
    
    
    if (checkPicked(event.currentTarget.getAttribute("name")) !== undefined) {
      console.log("You lost loser!");
      resetCards();
      setRound(0)
    } else {
      pickCard(event.currentTarget.getAttribute("name"));
      setRound((round) => round+1);
    }



  }

  // Takes an array of 4 'card' objects from cards state
  // Returns a jsx element to be rendered to screen
  function toJSX(cards) {
    let cardsToJsx = [];
    for (let cardNumber = 0; cardNumber < 4; cardNumber++) {
      cardsToJsx.push(<Card 
      source={cards[cardNumber].file} 
      name={cards[cardNumber].name}
      key={cards[cardNumber].key}
      onClick={onCardClick}
      />
      )
    }
    return (
      <div className="cardHolder">
        {cardsToJsx}
      </div>
    );
  }

    // Testing when things are rerendered to get a better understanding of React.
    useEffect(() => {
      console.log("GamePage (child of App) rerendered");
    })

  return (
    <div className="GamePage">


      {/* The ScoreDisplay component isn't super necessary, 
      I made it when I was trying to figure out why something
      didn't work to see if that was the problem. I guess it is a design
      question what should or shouldn't be a component anyways? */}

      <div className="infoArea">
        <ScoreDisplay score={round} onPlayAgain={onPlayAgainClick}/>
      </div>
        
      {cardsToPrint}

      <div className="instructionsArea">
        <p>Choose all 12 landmarks without choosing the same one more than once.</p>
      </div>

    </div>
  )
}

export default GamePage;