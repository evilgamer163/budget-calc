'use strict';

//<--- Переменные --->
const regExpText = /['а-яА-Я']+$/,
    regExpNum = /['0-9']+$/;

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
    percentDeposit: 0,
    moneyDeposit: 0,

    asking: () => {
        if(confirm('Есть ли у вас доп. источники дохода?')) {
            let itemIncome, cashIncome;
            do {
                itemIncome = prompt('Введите доп. источник дохода:');
            } while(isNumber(itemIncome));
            do {
                cashIncome = prompt(`Сколько вы зарабатываете в месяц на ${itemIncome}?`);
            } while(!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        let addExpensens = prompt('Перечислите возможные расходы за рассчитываемый период через запятую:');
        appData.addExpensens = addExpensens.toLowerCase().split(',');
        appData.addExpensens = appData.addExpensens.map( (item) => {
            item = item.trim();
            item = item[0].toUpperCase() + item.slice(1);
            return item;
        });
        appData.addExpensens = appData.addExpensens.join(', ');

        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        appData.getDeposit();

        for(let i = 0; i < 2; i++) {
            let amount, 
                requiredExpenses = [];
            do {
                requiredExpenses[i] = prompt('Введите обязательную статью расходов:');
            } while(isNumber(requiredExpenses[i]));
            
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
        if ((appData.mission / appData.budgetMonth) >= 0) {
            appData.period = `Цель будет достигнута за ${Math.ceil(appData.mission / appData.budgetMonth)} месяцев(а)`;
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
    },
    
    getDeposit: () => {
        if(appData.deposit) {
            do {
                appData.percentDeposit = prompt('Введите годовой процент:');
            } while(!isNumber(appData.percentDeposit));
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена:');
            } while(!isNumber(appData.moneyDeposit));
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
console.log('Возможные расходы: ' + appData.addExpensens);

console.log('Наша программа включает в себя данные:');
for(let key in appData) {
    console.log(`Свойство: ${key}, Значение: ${appData[key]}`);
}