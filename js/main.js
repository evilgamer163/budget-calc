'use strict';

const startButton = document.querySelector('.start-button');

const isNumber = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const getRandomNum = (min, max) => {
    return Math.floor(min + Math.random() * max);
};

const gameOver = () => {
    alert('GAME OVER!');
    return;
};

const startGame = () => {
    let enterNum;
    let randomNum;
    let count = 10;
    let reload;

    const game = () => {
        console.log('COUNT: ' + count);
        randomNum = getRandomNum(1, 100);
        console.log(randomNum);
        enterNum = prompt('Угадай число от 1 до 100:');

        if(enterNum === null) {
            gameOver();
        }

        if(enterNum < randomNum) {
            count--;
            alert(`Загаданное число больше, осталось попыток: ${count}`);
            game();
        } else if(enterNum > randomNum) {
            count--;
            alert(`Загаданное число меньше, осталось попыток: ${count}`);
            game();
        } else if(!isNumber(enterNum)) {
            alert('Это не число! Попробуй еще раз:');
            game();
        } else if(parseInt(enterNum) === randomNum) {
            let gameChoise = confirm('Поздравляю, Вы угадали!!! Хотели бы сыграть еще?');
            if(gameChoise) {
                game();
            } else {
                gameOver();
            }
        }
    };
    game();
    console.dir(game);
};

startButton.addEventListener('click', () => {
    startGame();
});