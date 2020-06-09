'use strict';

//<--- Переменные --->
let money = 35000,
    income = 'Сборка ПК',
    addExpensens = 'КРЕДИТ, Интернет, Подписки, Кошка',
    deposit = false,
    mission = 160000,
    period = 12,
    budgetDay,
    expenses1,
    expenses2,
    amount1,
    amount2,
    expensesMonth,
    accumulatedMonth;


//<--- Исходные параметры --->
money = +prompt('Ваш месячный доход?');

addExpensens = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:');

deposit = confirm('Есть ли у вас депозит в банке?');

expenses1 = prompt('Введите обязательную статью расходов:');
amount1 = +prompt('Во сколько это обойдется?');

expenses2 = prompt('Введите обязательную статью расходов(2):');
amount2 = +prompt('Во сколько это обойдется?');


//<--- Объявления функций --->
const showTypeOf = (data) => {
    console.log(data, typeof(data));
};

const getExpensesMonth = () => {
    return amount1 + amount2;
};

const getAccumulatedMonth = () => {
    return money - expensesMonth;
};

const getTargetMonth = () => {
    return mission / accumulatedMonth;
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

console.log(`Цель будет достигнута за ${Math.ceil(period)} месяцев(а)`);

console.log('Доход в день = ' + budgetDay.toFixed(2) + '₽');

console.log(getStatusIncome());