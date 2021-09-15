// Book class - to represent a book
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// UI class - handle storage
class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: 'Title One',
        author: 'Author One'
      },
      {
        title: 'Title Two',
        author: 'Author Two'
      }
    ];

    const books = StoredBooks;
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('p');
    row.innerHTML = `
        <div>${book.title}</div>
        <div>${book.author}</div>
        <div><a href="#" class="delete">Remove</a></div>
    `;
    list.appendChild(row);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
}

// Store class - handles storage

// Event - display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event - Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // prevent actual submit
  e.preventDefault();

  // get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  // Instatiate Book
  const book = new Book(title, author);
  
  // add book to UI
  UI.addBookToList(book);

  // Clear fields
  UI.clearFields();
});

// Event - Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
});