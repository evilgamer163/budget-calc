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
    let randomNum = getRandomNum(1, 100);
    let count = 10;
    let reload;

    console.log(randomNum);

    const game = () => {
        enterNum = prompt('Угадай число от 1 до 100:');

        if(enterNum === null) {
            gameOver();
        }

        if(enterNum < randomNum) {
            count--;
            if(count > 0 && enterNum !== null) {
                alert(`Загаданное число больше, осталось попыток: ${count}`);
                game();
            } else if(count === 0){
                reload = confirm('Попытки закончились, хотите сыграть еще?');
                if(reload) {
                    count = 10;
                    game();
                } else {
                    gameOver();
                }
            }
        } else if(enterNum > randomNum) {
            count--;
            if(count > 0 && enterNum !== null) {
                alert(`Загаданное число меньше, осталось попыток: ${count}`);
                game();
            } else if(count === 0) {
                reload = confirm('Попытки закончились, хотите сыграть еще?');
                if(reload) {
                    count = 10;
                    game();
                } else {
                    gameOver();
                }
            }
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

};

startButton.addEventListener('click', () => {
    startGame();
});