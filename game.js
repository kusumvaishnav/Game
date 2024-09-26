

const cardImages = [
    'emoji2 copy.webp', 'emoji5.webp', 'emoji8.webp', 'emojo11.webp',
    'Emoji6 copy.jpg', 'emoji14.jpg', 'emoji13 copy.jpg', 'emoji10.webp'
];

let cardArray = [...cardImages, ...cardImages];
let flippedCards = [];
let moveCounter = 0;
let matches = 0;

function setupGame() {
    const gameContainer = document.querySelector('#game-container');
    gameContainer.innerHTML = '';
    cardArray = shuffle(cardArray);

    cardArray.forEach(img => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="front"></div>
            <div class="back" style="background-image: url('${img}')"></div>
        `;
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });

    moveCounter = 0;
    matches = 0;
    document.querySelector('#move-counter').textContent = moveCounter;
    document.querySelector('#congratulations').style.display = 'none';
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flip')) {
        this.classList.add('flip');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    moveCounter++;
    document.querySelector('#move-counter').textContent = moveCounter;

    const [card1, card2] = flippedCards;
    const img1 = card1.querySelector('.back').style.backgroundImage;
    const img2 = card2.querySelector('.back').style.backgroundImage;

    if (img1 === img2) {
        flippedCards = [];
        matches++;
        if (matches === cardImages.length) {
            showCongratulations();
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flip');
            card2.classList.remove('flip');
            flippedCards = [];
        }, 1000);
    }
}

function showCongratulations() {
    const congratulations = document.querySelector('#congratulations');
    congratulations.style.display = 'block';
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

document.querySelector('#restart').addEventListener('click', setupGame);

setupGame(); // Initialize the game when the page loads
