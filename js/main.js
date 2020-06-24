'use strict';

//<--- DOM --->
const calculate = document.getElementById('start'), 
    reset = document.getElementById('cancel'),
    plusButtons = document.getElementsByTagName('button'),
    incomeAdd = document.getElementsByTagName('button')[0], 
    expensesAdd = document.getElementsByTagName('button')[1], 
    depositCheckmark = document.querySelector('#deposit-check'), 
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-items').querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-items').querySelector('.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    btnPlus = document.querySelectorAll('.btn_plus');

let placeholderSum = document.querySelectorAll('[placeholder="Сумма"]'),
    placeholderName = document.querySelectorAll('[placeholder="Наименование"]'),
    inputFields = document.querySelectorAll('input[type="text"]'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');

//<--- Functions --->
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
    placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
    placeholderSum.forEach( item => {
        item.addEventListener('input', () => {
            if(!isNumber(item.value)) {
                item.value = '';
                item.placeholder = 'Введите корректное значение!';
            }
        });
    });
};

// <--- Class --->
class AppData {
    constructor(){
        this.budget = 0;
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpensens = [];
        this.deposit = false;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        this.statusIncome = '';
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    }

    start() {
        if(!isNumber(salaryAmount.value)) {
            alert('Поле "Месячный доход" должно быть заполнено!');
            return;
        }
    
        calculate.style.display = 'none';
        inputFields = document.querySelectorAll('input[type="text"]');
        inputFields.forEach( item => {
            item.setAttribute('disabled', 'disabled');
        });
    
        btnPlus.forEach( item => {
            item.setAttribute('disabled', 'disabled');
        });
        
        reset.style.display = 'block';
    
        this.budget = +salaryAmount.value;
        
        this.getIncome();
        this.getIncomeMonth();
        this.getExpenses();
        this.getExpensesMonth();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();
        this.showResult();
    }

    showResult() {
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
    }
    
    addExpensensBlock() {
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
    }
    
    addIncomeBlock() {
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
    }
    
    getExpenses() {
        expensesItems.forEach( item => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    
    getIncome() {
        incomeItems.forEach( item => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
            }
        });
    }
    
    getAddExpenses() {
        let addExpensens = additionalExpensesItem.value.split(',');
        addExpensens.forEach( item => {
            item = item.trim();
            if(item !== '') {
                this.addExpensens.push(item);
            }
        });
    }
    
    getAddIncome() {
        additionalIncomeItem.forEach( item => {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getIncomeMonth() {
        for(let key in this.income) {
            this.incomeMonth += parseFloat(this.income[key]);
        }
    }
    
    getExpensesMonth() {
        for(let key in this.expenses) {
            this.expensesMonth += parseFloat(this.expenses[key]);
        }  
    }
    
    getBudget() {
        this.budgetMonth = (this.budget + this.incomeMonth) - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    }
    
    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }
    
    getStatusIncome() {
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
    }
    
    getDeposit() {
        if(this.deposit) {
            do {
                this.percentDeposit = prompt('Введите годовой процент:');
            } while(!isNumber(this.percentDeposit));
            do {
                this.moneyDeposit = prompt('Какая сумма заложена:');
            } while(!isNumber(this.moneyDeposit));
        }
    }
    
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }
    
    resetAll() {
        calculate.style.display = 'block';
        reset.style.display = 'none';
    
        inputFields = document.querySelectorAll('input[type="text"]');
        inputFields.forEach( item => {
            item.removeAttribute('disabled');
            item.value = '';
        });
    
        btnPlus.forEach( item => {
            if(item.style.display === 'none') {
                item.style.display = 'inline-block';
            }
            item.removeAttribute('disabled');
        });
    
        incomeItems.forEach( (item, i) => {
            while(i > 0) {
                item.remove();
                i--;
            }
        });
    
        expensesItems.forEach( (item, i) => {
            while(i > 0) {
                item.remove();
                i--;
            }
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
        this.incomeMonth = 0;
        this.statusIncome = '';
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
    }
    
    changePeriodAmount() {
        periodAmount.textContent = periodSelect.value;
    }
    
    eventsListeners() {
        const start = this.start.bind(this);
        const resetAll = this.resetAll.bind(this);
        calculate.addEventListener('click', start);
        reset.addEventListener('click', resetAll);
        expensesAdd.addEventListener('click', this.addExpensensBlock);
        incomeAdd.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('input', this.changePeriodAmount);
    }
}

const appData = new AppData();

// <--- Call functions --->
checkInputName();
checkInputNumber();
appData.eventsListeners();