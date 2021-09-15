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
        <div>${book.title}</div>
        <div>${book.author}</div>
        <div>${book.id}</div>
        <div><a href="#" class="delete">Remove</a></div>
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
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const booklist = document.querySelector('#book-list');
    container.insertBefore(div, booklist);

    // Disappear in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#id').value = '';
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