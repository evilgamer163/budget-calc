'use strict';

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
    budgetMonth;

money = prompt('Ваш месячный доход?');

addExpensens = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:');

deposit = confirm('Есть ли у вас депозит в банке?');

expenses1 = prompt('Введите обязательную статью расходов:');
amount1 = +prompt('Во сколько это обойдется?');

expenses2 = prompt('Введите обязательную статью расходов(2):');
amount2 = +prompt('Во сколько это обойдется?');

budgetMonth = money - (amount1 + amount2);

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(`Длина строки addExpenses = ${addExpensens.length}`);

console.log(`Период равен ${period} месяцам`);

console.log('Цель заработать ' + mission + ' ₽');

console.log(addExpensens.toLowerCase().split(', '));

console.log(`Бюджет на месяц составляет: ${budgetMonth}`);

console.log(`Цель будет достигнута за ${Math.ceil(mission / budgetMonth)} месяцев(а)`);

budgetDay = Math.floor(budgetMonth/30);

console.log('Доход в день = ' + budgetDay.toFixed(2) + '₽');

if(budgetDay > 1200) {
    console.log('У вас высокий уровень дохода!');
} else if(budgetDay >= 600 && budgetDay <= 1200) {
    console.log('У вас средний уровень дохода');
} else if( budgetDay < 0) {
    console.log('Что то пошло не так');
} else {
    console.log('ZERO');
}