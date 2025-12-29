// commons

const booksContain = document.getElementById('books-contain');
const headText = document.getElementById('headText');
const hideButton = document.getElementById('hide');

const listBooks = document.querySelector('#books-contain ul');

const addBookInput1 = document.querySelector('#addBook-contain input#n');
const addBookInput2 = document.querySelector('#addBook-contain input#m');
const addBookbtn = document.getElementById('addBook-btn')

const searchBox = document.querySelector('.search-contain input');

// Hiding Books
hideButton.addEventListener('click', (e) => {
    if (hideButton.checked) {
        booksContain.style.display = 'none'
        headText.style.display = 'none'
    } else {
        booksContain.style.display = 'block'
        headText.style.display = 'block'
    }
})

// Adding book
// add book in front

const bookDelete = "<span class='deleteBook'>حذف</span>"

function returning() {
    if (!addBookInput1.value) {
        addBookInput1.style.borderColor = 'red'
        document.getElementById('ws1').style.display = 'block';
    }
    if (!addBookInput2.value) {
        addBookInput2.style.borderColor = 'red'
        document.getElementById('ws2').style.display = 'block';
    }
    setTimeout(() => {
        addBookInput1.style.borderColor = 'blue'
        addBookInput2.style.borderColor = 'blue'
        document.getElementById('ws1').style.display = 'none';
        document.getElementById('ws2').style.display = 'none';
    }, 2000)
}

addBookbtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!addBookInput1.value || !addBookInput2.value) {
        return returning();
    }
    const bookName = document.createElement('span');
    bookName.className = 'nameBook';
    bookName.innerText = addBookInput1.value;

    const locationBook = document.createElement('span');
    locationBook.className = 'locBook';
    locationBook.innerText = addBookInput2.value;

    let bookli = document.createElement('li');

    bookli.appendChild(bookName);
    bookli.appendChild(locationBook);
    bookli.lastElementChild.insertAdjacentHTML('afterend', bookDelete)




    saveBooksInLocalStorage(addBookInput1.value, addBookInput2.value)

    listBooks.appendChild(bookli)
    addBookInput1.value = '';
    addBookInput2.value = '';

})


// add book in back

let arrayBooks;
let arrayLocs;

// Function
function saveBooksInLocalStorage(inputNameBook, inputLocationBook) {
    if (localStorage.getItem('k') === null) {
        arrayBooks = [];
    } else {
        arrayBooks = localStorage.getItem('k').split(',');
    }
    arrayBooks.push(inputNameBook);

    if (localStorage.getItem('m') === null) {
        arrayLocs = [];
    } else {
        arrayLocs = localStorage.getItem('m').split(',');
    }
    arrayLocs.push(inputLocationBook)

    localStorage.setItem('k', arrayBooks)
    localStorage.setItem('m', arrayLocs)
    document.querySelector('#q').innerText = arrayBooks.length;

}

document.addEventListener('DOMContentLoaded', (e) => {
    if (localStorage.getItem('k') === null) {
        arrayBooks = [];
    } else {
        arrayBooks = localStorage.getItem('k').split(',');
    }

    if (localStorage.getItem('m') === null) {
        arrayLocs = [];
    } else {
        arrayLocs = localStorage.getItem('m').split(',');
    }

    for (let index = 0; index < arrayBooks.length; index++) {
        const bookName = document.createElement('span');
        bookName.className = 'nameBook';
        bookName.innerText = arrayBooks[index];

        const locationBook = document.createElement('span');
        locationBook.className = 'locBook';
        locationBook.innerText = arrayLocs[index];

        const bookli = document.createElement('li');

        bookli.appendChild(bookName);
        bookli.appendChild(locationBook);
        bookli.lastElementChild.insertAdjacentHTML('afterend', bookDelete);

        listBooks.appendChild(bookli);
        document.querySelector('#q').innerText = arrayBooks.length;
    }
})

// removing book

// remove book in front

listBooks.addEventListener('click', (e) => {
    if (e.target.className === 'deleteBook') {
        e.target.parentElement.remove();
        // in back is in this function
        removeBookFromLocalStorage(e.target.parentElement.firstElementChild.innerText)
    }
})

// remove book in back

function removeBookFromLocalStorage(input) {
    if (localStorage.getItem('k') === null) {
        arrayBooks = [];
    } else {
        arrayBooks = localStorage.getItem('k').split(',');
    }

    for (let i = 0; i < arrayBooks.length; i++) {
        if (arrayBooks[i] === input) {
            arrayBooks.splice(i, 1);
        }
    }

    if (arrayBooks.length === 0) {
        localStorage.clear();
    } else {
        localStorage.setItem('k', arrayBooks);
    }
    document.querySelector('#q').innerText = arrayBooks.length;

}

// date
setInterval(() => {
    const date = new Date();

    const classdate = document.querySelector('.date');

    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let y = date.getFullYear();
    let mm = date.getMonth();
    let d = date.getDate();

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    d = d < 10 ? '0' + d : d;
    mm = mm < 10 ? '0' + mm : mm;

    classdate.innerText = `${y}/${mm}/${d} --- ${h}:${m}:${s}`
}, 1000)

// searching book

searchBox.addEventListener('keyup', (e) => {
    for (let index of listBooks.children) {
        if (index.firstElementChild.textContent.indexOf(searchBox.value) !== -1) {
            index.style.display = 'block'
        } else {
            index.style.display = 'none'
        }
    }
})