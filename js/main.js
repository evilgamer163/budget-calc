'use strict';

//<--- Переменные --->
let calculate = document.getElementById('start'), //Кнопка "Рассчитать"
    plusButtons = document.getElementsByTagName('button'),
    incomeAdd = document.getElementsByTagName('button')[0], //Кнопка + "Доп. доход"
    expensesAdd = document.getElementsByTagName('button')[1], //Кнопка + "Обязательные расходы"
    depositCheckmark = document.querySelector('#deposit-check'), //Чек-бокс Депозит
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    // additionalIncomeItemName = document.querySelectorAll('.additional_income-item')[0],
    // additionalIncomeItemSum = document.querySelectorAll('.additional_income-item')[1],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0], //Доход за месяц
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0], //Дневной бюджет
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0], //Расход за месяц
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0], //Возможные доходы
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0], //Возможные расходы
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0], //Накопления за период
    targetMonthValue = document.getElementsByClassName('target_month-value')[0], //Срок достижения цели
    salaryAmount = document.querySelector('.salary-amount'), //Сумма месячного дохода
    incomeItems = document.querySelectorAll('.income-items'), //Блок доп. доход
    incomeTitle = document.querySelector('.income-items').querySelector('.income-title'), //Имя доп. дохода
    incomeAmount = document.querySelector('.income-amount'), //Сумма доп. дохода
    expensesTitle = document.querySelector('.expenses-items').querySelector('.expenses-title'), //Имя обязательного расхода
    expensesItems = document.querySelectorAll('.expenses-items'), //Сумма обязательного расхода
    additionalExpensesItem = document.querySelector('.additional_expenses-item'), //Возможные расходы
    targetAmount = document.querySelector('.target-amount'), //Цель (сумма)
    periodSelect = document.querySelector('.period-select'), // Период расчета
    periodAmount = document.querySelector('.period-amount'), //значение периода расчета
    placeholderSum = document.querySelectorAll('[placeholder="Сумма"]'), //Все поля суммы
    placeholderName = document.querySelectorAll('[placeholder="Наименование"]'); //Все поля наименований

//<--- Объявления функций --->
const isNumber = (num) => {
    return !isNaN(parseFloat(num)) && isFinite(num);
};

const checkInputName = () => {
    placeholderName = document.querySelectorAll('[placeholder="Наименование"]');
    placeholderName.forEach( item => {
        let regExp = /[^A-Za-z0-9]/;
        item.addEventListener('input', () => {
            if(!regExp.test(item.value)) {
                item.value = '';
                item.placeholder = 'Введите корректное значение!';
            }
        });
    });
};

const checkInputNumber = () => {
    placeholderSum = document.querySelectorAll('[placeholder="Сумма"]')
    placeholderSum.forEach( item => {
        item.addEventListener('input', () => {
            if(!isNumber(item.value)) {
                item.value = '';
                item.placeholder = 'Введите корректное значение!';
            }
        });
    });
};

// <--- Объект --->
let appData = {
    budget: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpensens: [],
    deposit: false,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    statusIncome: '',
    percentDeposit: 0,
    moneyDeposit: 0,

    start: () => {
        appData.budget = +salaryAmount.value;
        
        appData.getExpenses();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.showResult();
    },

    showResult: () => {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay.toFixed(2);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpensens.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('change', () => {
            incomePeriodValue.value = appData.calcPeriod();
        });
    },

    addExpensensBlock: () => {
        let cloneExpensesBlock = expensesItems[0].cloneNode(true);
        cloneExpensesBlock.childNodes.forEach( item => {
            item.value = '';
        });
        expensesItems[0].parentNode.insertBefore(cloneExpensesBlock, expensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        checkInputName();
        checkInputNumber();
        if(expensesItems.length === 3) {
            expensesAdd.style.display = 'none';
        }
    },

    addIncomeBlock: () => {
        let cloneIncomeBlock = incomeItems[0].cloneNode(true);
        cloneIncomeBlock.childNodes.forEach( item => {
            item.value = '';
        });
        incomeItems[0].parentNode.insertBefore(cloneIncomeBlock, incomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        checkInputName();
        checkInputNumber();
        if(incomeItems.length === 3) {
            incomeAdd.style.display = 'none';
        }
    },

    getExpenses: () => {
        expensesItems.forEach( item => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    getIncome: () => {
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
    },

    getAddExpenses: () => {
        let addExpensens = additionalExpensesItem.value.split(',');
        addExpensens.forEach( item => {
            item = item.trim();
            if(item !== '') {
                appData.addExpensens.push(item);
            }
        });
    },

    getAddIncome: () => {
        additionalIncomeItem.forEach( item => {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: () => {
        for(let key in appData.expenses) {
            appData.expensesMonth += parseFloat(appData.expenses[key]);
        }  
    },

    getBudget: () => {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },

    getTargetMonth: () => {
        return targetAmount.value / appData.budgetMonth;
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
    },

    calcPeriod: () => {
        return appData.budgetMonth * periodSelect.value;
    }
};

// <--- Вызов функций --->
checkInputName();
checkInputNumber();

// <--- Обработчики событий --->
calculate.addEventListener('click', () => {
    if(!isNumber(salaryAmount.value)) {
        alert('Поле "Месячный доход" должно быть заполнено!');
    } else {
        appData.start();
    }
});
expensesAdd.addEventListener('click', appData.addExpensensBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', () => {
    periodAmount.textContent = periodSelect.value;
});

// <--- Выводы в консоль --->
// console.log(appData.period);
// console.log(appData.statusIncome);
// console.log('Возможные расходы: ' + appData.addExpensens);