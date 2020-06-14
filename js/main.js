'use strict';

//<--- Переменные --->
let money;

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
    statusIncome: '',

    asking: () => {
        let addExpensens = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:');
        appData.addExpensens = addExpensens.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for(let i = 0; i < 2; i++) {
            let amount, 
                requiredExpenses = [];
            requiredExpenses[i] = prompt('Введите обязательную статью расходов:');
            do {
                amount = +prompt(`Во сколько обойдется ${requiredExpenses[i]}:`);
            } while(!isNumber(amount));
            appData.expenses[requiredExpenses[i]] = amount;
        }
    },

    getExpensesMonth: () => {
        for(let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }  
    },

    getBudget: () => {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },

    getTargetMonth: () => {
        let month = appData.mission / appData.budgetMonth;
        if (month >= 0) {
            appData.period = `Цель будет достигнута за ${Math.ceil(month)} месяцев(а)`;
        } else {
            appData.period = 'Цель не будет достигнута!';
        }
    },

    getStatusIncome: () => {
        if(appData.budgetDay > 1200) {
            appData.statusIncome = 'У вас высокий уровень дохода!';
        } else if(appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
            appData.statusIncome = 'У вас средний уровень дохода';
        } else if(appData.budgetDay < 600 && appData.budgetDay > 0) {
            appData.statusIncome = 'К сожалению у вас уровень дохода ниже среднего';
        } else if( appData.budgetDay < 0) {
            appData.statusIncome = 'Что то пошло не так';
        } else {
            appData.statusIncome = 'ZERO';
        }
    }
};

// <--- Вызов функций --->
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();

//<--- Выводы в консоль --->
console.log(`Расходы за месяц составляют: ${appData.expensesMonth}`);
console.log(appData.period);
console.log(appData.statusIncome);