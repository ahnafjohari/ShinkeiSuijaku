function initGame() {
	// 🧠 Set the page title dynamically
	document.title = "Shinkei Suijaku 神経衰弱 🧠";

	// Clear previous content if any (useful for restart later)
	document.body.innerHTML = '';

	// 1️⃣ Create header
	const title = document.createElement('h1');
	title.textContent = 'Memory Game - Shinkei Suijaku 神経衰弱 🧠';
	document.body.appendChild(title);

	// 2️⃣ Create game board container
	const gameBoard = document.createElement('div');
	gameBoard.classList.add('game-board');
	document.body.appendChild(gameBoard);

	// 3️⃣ Define the cards data
	const flags = [
		{ name: 'japan', img: 'images/japan.svg' },
		{ name: 'malaysia', img: 'images/malaysia.svg' }
	];

	// 4️⃣ Build the cards dynamically
	createBoard(flags);

	// 5️⃣ Set up the game logic
	setupCardLogic(flags);
}

// 🧱 Create the card board UI
function createBoard(flags) {
	const gameBoard = document.querySelector('.game-board');

	// Duplicate and shuffle flags
	let cardsData = [...flags, ...flags].sort(() => Math.random() - 0.5);

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
}

// 🧠 Handle flipping and matching logic
function setupCardLogic(flags) {
	const cards = document.querySelectorAll('.card');
	let flippedCard = null;
	let lockBoard = false;
	let matchedPairs = 0;

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
					matchedPairs++;
					flippedCard = null;

					// 🏆 All matched?
					if (matchedPairs === flags.length) {
						setTimeout(() => {
							document.title = '🏆 You matched all!';
							alert('🎉 You matched all the flags!');
						}, 500);
					}

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
}