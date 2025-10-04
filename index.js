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
        // ✅ match
        flippedCard = null;
      } else {
        // ❌ no match
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
