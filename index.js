// 1️⃣ Create header
const title = document.createElement('h1');
title.textContent = '🧠 Flag Memory Game';
document.body.appendChild(title);

// 2️⃣ Create game board container
const gameBoard = document.createElement('div');
gameBoard.classList.add('game-board');
document.body.appendChild(gameBoard);

// 3️⃣ Define the cards data
const flags = [
  { name: 'japan', img: 'https://flagcdn.com/w320/jp.png' },
  { name: 'malaysia', img: 'https://flagcdn.com/w320/my.png' }
];

// Duplicate and shuffle the flags
let cardsData = [...flags, ...flags];
cardsData = cardsData.sort(() => Math.random() - 0.5); // simple shuffle

// 4️⃣ Create card elements dynamically
cardsData.forEach(flag => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.flag = flag.name;

  const front = document.createElement('div');
  front.classList.add('front');
  const img = document.createElement('img');
  img.src = flag.img;
  img.alt = flag.name;
  front.appendChild(img);

  const back = document.createElement('div');
  back.classList.add('back');
  back.textContent = '❓';

  card.appendChild(front);
  card.appendChild(back);

  gameBoard.appendChild(card);
});

// 5️⃣ Flip & match logic
const cards = document.querySelectorAll('.card');
let flippedCard = null;
let lockBoard = false;

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (lockBoard) return;
    if (card === flippedCard) return;

    card.classList.add('flipped');

    if (!flippedCard) {
      flippedCard = card;
    } else {
      if (card.dataset.flag === flippedCard.dataset.flag) {
        // ✅ Match found
        flippedCard = null;
      } else {
        // ❌ No match
        lockBoard = true;
        setTimeout(() => {
          card.classList.remove('flipped');
          flippedCard.classList.remove('flipped');
          flippedCard = null;
          lockBoard = false;
        }, 1000);
      }
    }
  });
});
