const words = ["essence", "airport", "statement", "summer", "flamingo", "warehouse", "eternity", "destiny", "sunshine", "faith", "inspiration", "consequences"];

let currentWord = '';
let currentIndex = 0;
let correctWords = 0;
let mistakesInCurrentWord = 0;
let timerInterval;
let elapsedTime = 0;
let isStarted = false;

const wordElement = document.querySelector('.word');
const correctCountElement = document.querySelector('.correct-count');
const mistakesElement = document.querySelector('.word-mistakes');
const timerElement = document.getElementById('timer');

function getRandomWord() {
    const randomWord = Math.floor(Math.random() * words.length);
    return words[randomWord];
}

function updateWord() {
    currentWord = getRandomWord();
    currentIndex = 0;
    mistakesInCurrentWord = 0;

    wordElement.textContent = '';

    for (let letter of currentWord) {
        const span = document.createElement('span');
        span.textContent = letter;
        wordElement.append(span);
    }

    updateMistakesCounter();
}

function updateMistakesCounter() {
    mistakesElement.textContent = mistakesInCurrentWord;
}

function startTimer() {
    timerInterval = setInterval(() => {
        elapsedTime++;
        timerElement.textContent = formatTime(elapsedTime);
    }, 1000);
}

function formatTime(totalSeconds) {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
}

document.addEventListener('keydown', event => {
    const typedLetter = event.key;

    if (!isStarted) {
        isStarted = true;
        startTimer();
    }

    if (typedLetter === currentWord[currentIndex]) {
        const spans = wordElement.querySelectorAll('span');
        spans[currentIndex].classList.remove('w');
        spans[currentIndex].classList.add('c');
        currentIndex++;

        if (currentIndex === currentWord.length) {
            correctWords++;
            correctCountElement.textContent = correctWords;
            updateWord();
            if (correctWords === 5) {
                alert(`Победа! Ваше время: ${formatTime(elapsedTime)}`);
                resetGame();
            }
        }
    } else {
        mistakesInCurrentWord++;
        mistakesElement.textContent = mistakesInCurrentWord;
        const spans = wordElement.querySelectorAll('span');
        spans[currentIndex].classList.add('w');
    }
});

function resetGame() {
    clearInterval(timerInterval);
    isStarted = false;
    correctWords = 0;
    mistakesInCurrentWord = 0;
    elapsedTime = 0;
    updateWord();
    correctCountElement.textContent = correctWords;
    mistakesElement.textContent = mistakesInCurrentWord;
    timerElement.textContent = '00:00';
}

updateWord();