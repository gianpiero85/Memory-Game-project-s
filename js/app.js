/*
 * Create a list that holds all of your cards
 */
// variable  / variables
let cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];
let moves = 0;
let stars = "3";
let matches = 0;
let openCards = [];
let average = 3;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
// add the tag to the HTML/ funcion que agrega codigo HTML
function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li> `;
}
// function to start the game/  funcion que inicia el tablero
function initGame() {
  var deck = document.querySelector('.deck');
  var cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  deck.innerHTML = cardHTML.join('');
}
initGame();
// flips cards/ evento de voltear las  cartas
let allCards = document.querySelectorAll('.card');
allCards.forEach(function(card) {
  card.addEventListener('click', function(e) {

    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      openCards.push(card);
      card.classList.add('open', 'show');

      if (openCards.length == 2) {
        // if match/ si son iguales
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          openCards[0].classList.add('match');
          openCards[0].classList.add('open');
          openCards[0].classList.add('show');

          openCards[1].classList.add('match');
          openCards[1].classList.add('open');
          openCards[1].classList.add('show');
          openCards = [];
          moves++;
          matches++;
          score();
          endGame();
        } else {
          // if do not match/ si no son iguales
          setTimeout(function() {
            openCards.forEach(function(card) {
              card.classList.remove('open', 'show');
            });
            openCards = [];
            moves++;
            score();
          }, 150);
        }

      }
    }

  });
});
// score function / funcion que calcula tu puntaje
function score() {
  if (moves === 1) {
      $("#movesText").text(" Move");
    } else {
      $("#movesText").text(" Moves");
    }
    $("#moves").text(moves.toString());
  if (moves >= 20) {
    $("#one").removeClass("fa-star");
     stars ="1";
     average = 1;
  } else if (moves >= 16) {
    $("#two").removeClass("fa-star");
      stars = "2";
      average = 2;
  }
}
//timer / crometro
function timer() {
  let clicks = 0;
  $(".card").on("click", function() {
    clicks += 1;
    if (clicks === 1) {
      var sec = 0;
      function time ( val ) { return val > 9 ? val : "0" + val; }
      timer = setInterval( function(){
        $(".seconds").html(time(++sec % 60));
        $(".minutes").html(time(parseInt(sec / 60, 10)));
      }, 1000);
    }
  })
 }
timer();
// restart  bottom / boton de resteo
$("#restart").on('click', function () {
  location.reload()
});

// end of the game
// Open popup when game is complete source: www.w3schools.com
function endGame() {

  if (matches === 8) {
    var modal = document.getElementsByClassName("popup")[0];
    var span = document.getElementById("close");

    $("#total-moves").text(moves);
    $("#total-average").text(average);

   modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

   $("#play-again-btn").on("click", function() {
       location.reload()
   });

   clearInterval(timer);


 }
}

// Reset openCard.length to 0
function removeOpenCards() {
  openCard = [];
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
