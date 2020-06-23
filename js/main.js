'use strict';

//<--- Переменные --->
let calculate = document.getElementById('start'), //Кнопка "Рассчитать"
    reset = document.getElementById('cancel'),
    plusButtons = document.getElementsByTagName('button'),
    incomeAdd = document.getElementsByTagName('button')[0], //Кнопка + "Доп. доход"
    expensesAdd = document.getElementsByTagName('button')[1], //Кнопка + "Обязательные расходы"
    depositCheckmark = document.querySelector('#deposit-check'), //Чек-бокс Депозит
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
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
    placeholderName = document.querySelectorAll('[placeholder="Наименование"]'), //Все поля наименований
    inputFields = document.querySelectorAll('input[type="text"]');

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
const appData = {
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

    start: function() {
        this.budget = +salaryAmount.value;
        
        this.getExpenses();
        this.getExpensesMonth();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();
        this.showResult();
    },

    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay.toFixed(2);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpensens.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcPeriod();
        });
    },

    addExpensensBlock: function() {
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

    addIncomeBlock: function() {
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

    getExpenses: function() {
        expensesItems.forEach( item => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    getIncome: function() {
        if(confirm('Есть ли у вас доп. источники дохода?')) {
            let itemIncome, cashIncome;
            do {
                itemIncome = prompt('Введите доп. источник дохода:');
            } while(isNumber(itemIncome));
            do {
                cashIncome = prompt(`Сколько вы зарабатываете в месяц на ${itemIncome}?`);
            } while(!isNumber(cashIncome));
            this.income[itemIncome] = cashIncome;
        }
    },

    getAddExpenses: function() {
        let addExpensens = additionalExpensesItem.value.split(',');
        addExpensens.forEach( item => {
            item = item.trim();
            if(item !== '') {
                this.addExpensens.push(item);
            }
        });
    },

    getAddIncome: function() {
        additionalIncomeItem.forEach( item => {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function() {
        for(let key in this.expenses) {
            this.expensesMonth += parseFloat(this.expenses[key]);
        }  
    },

    getBudget: function() {
        this.budgetMonth = this.budget - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },

    getTargetMonth: function() {
        return targetAmount.value / this.budgetMonth;
    },

    getStatusIncome: function () {
        if(this.budgetDay > 1200) {
            this.statusIncome = 'У вас высокий уровень дохода!';
        } else if(this.budgetDay >= 600 && this.budgetDay <= 1200) {
            this.statusIncome = 'У вас средний уровень дохода';
        } else if(this.budgetDay < 600 && this.budgetDay > 0) {
            this.statusIncome = 'К сожалению у вас уровень дохода ниже среднего';
        } else if( this.budgetDay < 0) {
            this.statusIncome = 'Что то пошло не так';
        } else {
            this.statusIncome = 'ZERO';
        }
    },
    
    getDeposit: function() {
        if(this.deposit) {
            do {
                this.percentDeposit = prompt('Введите годовой процент:');
            } while(!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt('Какая сумма заложена:');
            } while(!isNumber(this.moneyDeposit));
        }
    },

    calcPeriod: function() {
        return this.budgetMonth * periodSelect.value;
    },

    resetAll: function() {
        inputFields = document.querySelectorAll('input[type="text"]');
        inputFields.forEach( item => {
            item.removeAttribute('readonly');
            item.value = '';
        });

        this.budget = 0;
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpensens = [];
        this.deposit = false;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.statusIncome = '';
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    }
};

// <--- Вызов функций --->
checkInputName();
checkInputNumber();



// <--- Обработчики событий --->
calculate.addEventListener('click', () => {
    if(!isNumber(salaryAmount.value)) {
        alert('Поле "Месячный доход" должно быть заполнено!');
        return;
    } else {
        calculate.style.display = 'none';
        inputFields.forEach( item => {
            item.setAttribute('readonly', 'readonly');
        });
        reset.style.display = 'block';
        const start = appData.start.bind(appData);
        start();
    }
});
reset.addEventListener('click', () => {
    appData.resetAll();
    calculate.style.display = 'block';
    reset.style.display = 'none';
});
expensesAdd.addEventListener('click', appData.addExpensensBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', () => {
    periodAmount.textContent = periodSelect.value;
});