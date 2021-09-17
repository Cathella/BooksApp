const navlist = document.getElementById('navlist');
const navform = document.getElementById('navform');
const navcontact = document.getElementById('navcontact');
const bklist = document.getElementById('bklist');
const bkform = document.getElementById('bkform');
const bkcontact = document.getElementById('bkcontact');

// Book class - to represent a book
class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

// UI class - handle storage
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('p');
    row.innerHTML = `
        <div>"${book.title}" by ${book.author}</div>
        <div class="hide">${book.id}</div>
        <div><button class="delete">Remove</button></div>
    `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const booklist = document.querySelector('#book-list');
    container.insertBefore(div, booklist);

    // Disappear in 2 seconds
    setTimeout(() => document.querySelector(`.alert-${className}`).remove(), 2000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#id').value = '';
  }

  static showDate() {
    const { DateTime } = luxon;
    const myDate = document.querySelector('#date');
    const showMyDate = document.createElement('div');
    showMyDate.innerHTML = DateTime.now().toLocaleString(DateTime.DATETIME_MED);
    myDate.appendChild(showMyDate);
  }

  static displayList() {
    bklist.classList.remove('display-none');
    bkform.classList.add('display-none');
    bkcontact.classList.add('display-none');
  }

  static displayForm() {
    bklist.classList.add('display-none');
    bkform.classList.remove('display-none');
    bkcontact.classList.add('display-none');
  }

  static displayContact() {
    bklist.classList.add('display-none');
    bkform.classList.add('display-none');
    bkcontact.classList.remove('display-none');
  }
}

// Store class - handles storage
class Store {
  static getBooks () {
    let books;

    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook (book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook (id) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event - display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Show date
document.addEventListener('DOMContentLoaded', UI.showDate);

// Event - Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // prevent actual submit
  e.preventDefault();

  // get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const id = `${title} ${author}`;
  console.log(id);

  // validate fields
  if (title === '' || author === '' || id === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    const book = new Book(title, author, id); // Instatiate Book
    UI.addBookToList(book); // add book to UI
    Store.addBook(book); // add book to store
    UI.showAlert('Book Added', 'success'); // Show success message
    UI.clearFields(); // Clear fields
  }
});

// Event - Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target); // remove book from UI

  // remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  UI.showAlert('Book Removed', 'success'); // Show success message
});

navlist.addEventListener('click', UI.displayList);
navform.addEventListener('click', UI.displayForm);
navcontact.addEventListener('click', UI.displayContact);
