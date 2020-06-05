let money = 35000,
    income = 'Сборка ПК',
    addExpensens = 'КРЕДИТ, Интернет, Подписки, Кошка',
    deposit = false,
    mission = 160000,
    period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(`Длина строки addExpenses = ${addExpensens.length}`);

console.log(`Период равен ${period} месяцам`);

console.log('Цель заработать ' + mission + ' ₽');

console.log(addExpensens.toLowerCase().split(', '));

let budgetDay = money/30;

console.log('Доход в день = ' + budgetDay.toFixed(2) + '₽');