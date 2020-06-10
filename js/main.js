'use strict';

//<--- Переменные --->
let money,
    income = 'Сборка ПК',
    addExpensens = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 160000,
    period = 12,
    budgetDay,
    expenses = [],
    expensesMonth,
    accumulatedMonth;


//<--- Объявления функций --->
const isNumber = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const start = () => {
    do {
        money = prompt('Ваш месячный доход?');
    } while(!isNumber(money));
};

const showTypeOf = (data) => {
    console.log(data, typeof(data));
};

const getExpensesMonth = () => {
    let amount, sum = 0;
    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов:');
        do {
            amount = +prompt('Во сколько это обойдется?');
        } while(!isNumber(amount));
        sum += amount;
    }
    return sum;    
};

const getAccumulatedMonth = () => {
    return money - expensesMonth;
};

const getTargetMonth = () => {
    let res = mission / accumulatedMonth;
    // if(res < 0) {
    //     return 'Цель не будет достигнута!';
    // }
    // return `Цель будет достигнута за ${Math.ceil(res)} месяцев(а)`;
    while (res >= 0) {
        return `Цель будет достигнута за ${Math.ceil(res)} месяцев(а)`;
    }
    return 'Цель не будет достигнута!';
};

const getStatusIncome = () => {
    if(budgetDay > 1200) {
        return 'У вас высокий уровень дохода!';
    } else if(budgetDay >= 600 && budgetDay <= 1200) {
        return 'У вас средний уровень дохода';
    } else if(budgetDay < 600 && budgetDay > 0) {
        return 'К сожалению у вас уровень дохода ниже среднего';
    } else if( budgetDay < 0) {
        return 'Что то пошло не так';
    } else {
        return 'ZERO';
    }
};


// <--- Вызов функций --->
start();

expensesMonth = getExpensesMonth();
accumulatedMonth = getAccumulatedMonth();
period = getTargetMonth();
budgetDay = Math.floor(accumulatedMonth/30);
getStatusIncome();

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


//<--- Выводы в консоль --->
console.log(`Расходы за месяц составляют: ${expensesMonth}`);
console.log(addExpensens.toLowerCase().split(', '));
console.log(period);
console.log('Доход в день = ' + budgetDay.toFixed(2) + '₽');
console.log(getStatusIncome());





console.log(isNaN('dgsdfgdfg'));