'use strict';

// <--- DOM --->
const adv = document.querySelector('.adv'), //Реклама
    bookAside = document.querySelector('.books'), //Колонка с блоками книг
    books = document.querySelectorAll('.book'), //Блоки книг
    chaptersBook2 = books[0].getElementsByTagName('li'), //Главы второй книги
    chaptersBook5 = books[5].getElementsByTagName('li'), //Главы пятой книги
    chaptersBook6 = books[2].getElementsByTagName('li'); //Главы шестой книги


// console.log(books);

// <--- Функции --->
const sortChaptersBook2 = () => {
    chaptersBook2[1].after(chaptersBook2[3]);
    chaptersBook2[9].after(chaptersBook2[3]);
    chaptersBook2[8].before(chaptersBook2[6]);
    chaptersBook2[6].after(chaptersBook2[3]);
    chaptersBook2[6].after(chaptersBook2[3]);
};

const sortChaptersBook5 = () => {
    chaptersBook5[1].after(chaptersBook5[9]);
    chaptersBook5[9].before(chaptersBook5[6]);
    chaptersBook5[6].before(chaptersBook5[3]);
};

const sortBook = () => {
    bookAside.prepend(books[1]);
    bookAside.append(books[2]);
    books[4].after(books[3]);
};

const addChapter = () => {
    const newChapter = document.createElement('li');
    newChapter.textContent = 'Глава 8: За пределами ES6';
    chaptersBook6[8].after(newChapter);
};

// <--- Вызовы функций --->
sortBook(); //Восстановление порядка книг
document.body.style.backgroundImage = 'url("../image/you-dont-know-js.jpg")'; //Замена картинки заднего фона
books[4].getElementsByTagName('a')[0].textContent = 'Книга 3. this и Прототипы Объектов'; //Исправление заголовка
adv.remove(); //удаление рекламы
sortChaptersBook2(); //Сортировка глав второй книги
sortChaptersBook5(); //Сортировка глав пятой книги
addChapter(); //Добавление 8-й главы