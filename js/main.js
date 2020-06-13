'use strict';

//<--- Переменные --->
let money,
    budgetDay,
    expensesMonth,
    accumulatedMonth,
    expenses = [],
    period = 12;

//<--- Объявления функций --->
const isNumber = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const start = () => {
    do {
        money = prompt('Ваш месячный доход?');
    } while(!isNumber(money));
};

start();

// <--- Объект --->
let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpensens: [],
    deposit: false,
    mission: 100000,
    period: 6,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: () => {
        let addExpensens = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:');
        appData.addExpensens = addExpensens.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },

    getExpensesMonth: () => {
        let amount, sum = 0;
        for (let i = 0; i < 2; i++) {
            appData.addExpensens[i] = prompt('Введите обязательную статью расходов:');
            do {
                amount = +prompt('Во сколько это обойдется?');
            } while(!isNumber(amount));
            sum += amount;
        }
        return sum;    
    },

    getAccumulatedMonth: () => {
        return appData.budget - expensesMonth;
    },

    getTargetMonth: () => {
        let res = appData.mission / accumulatedMonth;
        while (res >= 0) {
            return `Цель будет достигнута за ${Math.ceil(res)} месяцев(а)`;
        }
        return 'Цель не будет достигнута!';
    },

    getStatusIncome: () => {
        if(appData.budgetDay > 1200) {
            return 'У вас высокий уровень дохода!';
        } else if(appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
            return 'У вас средний уровень дохода';
        } else if(appData.budgetDay < 600 && appData.budgetDay > 0) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else if( appData.budgetDay < 0) {
            return 'Что то пошло не так';
        } else {
            return 'ZERO';
        }
    }
};

// <--- Вызов функций --->

appData.asking();
expensesMonth = appData.getExpensesMonth();
accumulatedMonth = appData.getAccumulatedMonth();
period = appData.getTargetMonth();
budgetDay = Math.floor(accumulatedMonth/30);
appData.getStatusIncome();


//<--- Выводы в консоль --->
console.log(`Расходы за месяц составляют: ${expensesMonth}`);
console.log(appData.addExpensens);
console.log(period);
console.log('Доход в день = ' + budgetDay.toFixed(2) + '₽');
console.log(appData.getStatusIncome());