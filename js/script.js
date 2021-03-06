let myLibrary = []
const submit = document.getElementById('submit');


// Book Class / function: reps book
class Book {
    constructor(title, author, pages, isbn, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isbn = isbn;
        this.read = read;
    }
}

// function Book(title, author, pages, read){
//     //constructor
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
// }

//UI class: handle UI tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.getElementById('book-list');

        const row = document.createElement('tr');
        row.classList.add('book-row');
        row.setAttribute("data-isbn", book.isbn);
        row.innerHTML = `
        <td>
        <div class="book-lbl">Title</div>
        <div class="book-val">
            ${book.title}
        </div>
        </td>
        
        <td>
        <div class="book-lbl">Author</div>
        <div class="book-val">
        ${book.author}</td>
        
        <td>
        <div class="book-lbl">Pages</div>
        <div class="book-val">
        ${book.pages}
        </td>
        
        <td>
        <div class="book-lbl" data-isbn="${book.isbn}">ISBN</div>
        <div class="book-val">
        ${book.isbn}
        </td>
        
        <td>
        <div class="book-lbl">Read</div>
        <div class="book-val">
        ${book.read}
        </td>
        
        <td><a href="#" id="delBtn" class="btn btn-danger btn-sm delete" data-isbn="${book.isbn}">X</td>
        `;
        list.appendChild(row);

    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            const isbn = el.dataset.isbn;
            // el.parentElement.parentElement.remove();
            document.querySelector(`.book-row[data-isbn="${isbn}"]`)
                .remove();

            UI.showAlert('Book Removed!', 'success');
            // Store.removeBook()
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        const xbutton = document.createElement('button');

        xbutton.type = 'button'
        xbutton.className = 'btn-close'
        xbutton.style.float = "right";
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        div.appendChild(xbutton);

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        //make alert disappear after 5 seconds or user clicks x button
        const timeout = setTimeout(() => document.querySelector('.alert').remove(), 5000)
        xbutton.addEventListener('click', (e) => {
            document.querySelector('.alert').remove();
            clearTimeout(timeout);
        })


    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#isbn').value = '';
        document.querySelector('#read').checked = false;

    }

}


//Store Class: handles storage
//remember cant store objects into local storage must be a string...stringify it

class Store {
    static getBooks() {
        let books;
        //if no array books in local storage create it
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        //loop through them
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                // console.log(book.isbn)
                // console.log(isbn);
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const titleField = document.getElementById('title');
    const authorField = document.getElementById('author');
    const pagesField = document.getElementById('pages');
    const isbnField = document.getElementById('isbn');
    const readField = document.getElementById('read');

    //validation prevent empty entries
    if (titleField.value === '' || authorField.value === '' || isNaN(pagesField.valueAsNumber) || isbnField.value === '') {
        //
        UI.showAlert('Please fill in all fields!', 'danger')
    } else {

        const addBook = new Book(titleField.value, authorField.value, pagesField.valueAsNumber, isbnField.value, readField.checked);
        UI.addBookToList(addBook);
        //success message
        UI.showAlert('Book Successfully added!', 'success')

        //Add book to storage
        Store.addBook(addBook);

        // clear form fields
        UI.clearFields();

    }
})

//clear fields


//Event: Remove a Book
    const bookList = document.querySelector('#book-list');
    bookList.addEventListener('click', (e) => {
    // if(e.target === document.getElementById('delBtn')){
    //
    // }
    // console.log(e.target);

    // const deleteBtn = document.getElementById('delBtn');
    // console.log(deleteBtn);



    // if(e.target === )


    // const isbnID = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const isbnKey = e.target.dataset.isbn;
    console.log(isbnKey);

    // const isbnID = document.querySelector()
    // console.log(isbnID);

    //Remove book from UI
    UI.deleteBook(e.target);

    //Remove book from storage

    Store.removeBook(isbnKey);


    //show success message


});


// Book.prototype.info = function (){
//         return("Title: "+this.title+" Author: "+this.author+" Pages: "+this.pages+" Read: "+this.read)
// }

const theHobbit = new Book('The Hobbit', 'Tolkien', 400, true);

const harryPotter = new Book('Harry Potter', 'JK Rowling', 300, false);


function addBookToLibrary() {
    //to add to myLibrary array
    myLibrary.push(theHobbit);
    myLibrary.push(harryPotter);
}


addBookToLibrary();
// console.log(theHobbit.info())
// console.log(myLibrary)

console.log(document.querySelectorAll('#book-list'));