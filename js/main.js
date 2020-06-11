'use strict';

const startButton = document.querySelector('.start-button');

const isNumber = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const getRandomNum = (min, max) => {
    return Math.floor(min + Math.random() * max);
};

const startGame = () => {
    let enterNum;
    let randomNum = getRandomNum(1, 100);

    const game = () => {
        enterNum = prompt('Угадай число от 1 до 100:');

        if(enterNum === null) {
            alert('GAME OVER!');
            return;
        }

        if(enterNum < randomNum) {
            alert('Загаданное число больше! Попробуй еще раз:');
            game();
        } else if(enterNum > randomNum) {
            alert('Загаданное число меньше! Попробуй еще раз:');
            game();
        } else if(!isNumber(enterNum)) {
            alert('Это не число! Попробуй еще раз:');
            game();
        } else if(parseInt(enterNum) === randomNum) {
            alert('Вы выиграли!');
        } 
    };
    game();
};

startButton.addEventListener('click', () => {
    startGame();
});