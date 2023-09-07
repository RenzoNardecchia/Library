const body = document.querySelector('body');
const bookshelf = document.querySelector('main');

// Array that stores the books
let myLibrary = [];

// Book object constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = read;
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readState}`;
    }
    this.changeReadStatus = function(){
        if(this.readState === 'read'){
            this.readState = 'not read'
        } else{
            this.readState = 'read'
        }
    }
}

//function that adds the books to the library (duh)
function addBookToLibrary(book){
    myLibrary.push(book);
}

//function that loops through the 'myLibrary' array and displays the books
function displayBooks(){
    if(myLibrary === [])return;
    for(book in myLibrary){
        // Book card creation
        let bookCard = document.createElement('div');
        bookCard.classList.add('bookcard');
        bookshelf.appendChild(bookCard);

            let bookTitle = document.createElement('p');
            bookTitle.textContent = myLibrary[book].title;
            bookTitle.classList.add('bookcardTitle');
            bookCard.appendChild(bookTitle);

            let bookAuthor = document.createElement('p');
            bookAuthor.textContent = `Author: ${myLibrary[book].author}`;
            bookAuthor.classList.add('author');
            bookCard.appendChild(bookAuthor);

            let bookPages = document.createElement('p');
            bookPages.textContent = `Pages: ${myLibrary[book].pages}`;
            bookPages.classList.add('pages');
            bookCard.appendChild(bookPages);

            let bookReadState = document.createElement('p');
            bookReadState.textContent = `Read state: ${myLibrary[book].readState}`;
            bookReadState.classList.add('readState');
            bookCard.appendChild(bookReadState);

            let editButtonsContainer = document.createElement('div');
            editButtonsContainer.classList.add('editButtonsContainer');
            bookCard.appendChild(editButtonsContainer);

            let changeReadStatusBtn = document.createElement('button');
            changeReadStatusBtn.textContent = 'Edit read state';
            changeReadStatusBtn.classList.add('changeReadStateButton');
            editButtonsContainer.appendChild(changeReadStatusBtn);
            changeReadStatusBtn.setAttribute('data-attribute', book);
            changeReadStatusBtn.addEventListener('click', changeReadStatusFunc);

            let deleteBookBtn = document.createElement('button');
            deleteBookBtn.textContent = `Delete`;
            deleteBookBtn.classList.add('deleteBtn');
            editButtonsContainer.appendChild(deleteBookBtn);
            // This gives the button a data-attribute equal to the book index in the array
            // so it can target the bookcard it's in
            deleteBookBtn.setAttribute('data-attribute', book);
            deleteBookBtn.getAttribute
            deleteBookBtn.addEventListener('click', deleteBook);

    }
}

function clearDisplay(){
    let abc = document.querySelectorAll('.bookcard');
    for(const el of abc){
        el.remove();
    }
}

// this is the delete button from the bookcard
function deleteBook(e){
    // this variable stores the data attribute of the button that's being clicked
    // (that data-attribute corresponds to the book index of the book card it's in)
    let currentBook = (e.target).getAttribute('data-attribute');
    myLibrary.splice(currentBook, 1);
    // here I delete all the bookcards and then create the ones left in the array 
    // to reset the data-attributes
    clearDisplay();
    displayBooks();
    if(myLibrary.length == 0){
        showNewBookButton();
        deletePlusButton();
    }
}

// this is the change read state button from the bookcard
function changeReadStatusFunc(e){
    let currentBook = (e.target).getAttribute('data-attribute');
    myLibrary[currentBook].changeReadStatus();
    clearDisplay();
    displayBooks();
}

// this function shows the '+ Add a book button' when there aren't any books in display
function showNewBookButton(){
    let addNewBookBtn = document.createElement('button');
    addNewBookBtn.textContent= '+ Add a new book';
    addNewBookBtn.setAttribute('id', 'newBook');
    body.appendChild(addNewBookBtn);
    addNewBookBtn.addEventListener('click', showForm);
}

// this function deletes the 'Add a book' button when there are books in display
function deleteNewBookButton(){
    const element = document.getElementById('newBook');
    element.remove();
}

// this button shows when there are books in display
function showPlusButton(){
    let addPlusBtn = document.createElement('button');
    addPlusBtn.setAttribute('id', 'plusButtonContainer');
    let text = document.createElement('p');
    text.classList.add('plusButtonIcon');
    text.textContent = '+';
    body.appendChild(addPlusBtn);
    addPlusBtn.appendChild(text);
    addPlusBtn.addEventListener('click', showForm);
}

// this function deletes the '+' button when there are no books in the display
function deletePlusButton(){
    const element = document.getElementById('plusButtonContainer');
    element.remove();
}

// I decided to use only Javascript to make the form to practice my DOM manipulation skills
function showForm(){
    let popupForm = document.createElement('div');
    popupForm.classList.add('popupForm');
    body.appendChild(popupForm);

    let titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Title';
    popupForm.appendChild(titleLabel);

    let titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'title');
    popupForm.appendChild(titleInput);

    let authorLabel = document.createElement('label');
    authorLabel.setAttribute('for', 'author');
    authorLabel.textContent = 'Author';
    popupForm.appendChild(authorLabel);

    let authorInput = document.createElement('input');
    authorInput.setAttribute('type', 'text');
    authorInput.setAttribute('id', 'author');
    popupForm.appendChild(authorInput);

    let pagesLabel = document.createElement('label');
    pagesLabel.setAttribute('for', 'pages');
    pagesLabel.textContent = 'Pages';
    popupForm.appendChild(pagesLabel);

    let pagesInput = document.createElement('input');
    pagesInput.setAttribute('type', 'number');
    pagesInput.setAttribute('id', 'pages');
    popupForm.appendChild(pagesInput);

    let readStateLabel = document.createElement('label');
    readStateLabel.textContent = 'Have you read it?';
    popupForm.appendChild(readStateLabel);

    let radioBtnContainer = document.createElement('div');
    radioBtnContainer.classList.add('read');
    popupForm.appendChild(radioBtnContainer);

    let individualBtnContainerA = document.createElement('div');
    individualBtnContainerA.classList.add('individualBtnContainer');
    radioBtnContainer.appendChild(individualBtnContainerA);

    let readBtn = document.createElement('input');
    readBtn.setAttribute('type', 'radio');
    readBtn.setAttribute('id', 'read');
    readBtn.setAttribute('name', 'readState');
    readBtn.classList.add('readState');
    readBtn.setAttribute('value', 'read');
    individualBtnContainerA.appendChild(readBtn);

    let readLabel = document.createElement('label');
    readLabel.setAttribute('for', 'read');
    readLabel.classList.add('radioButtonLabel');
    readLabel.textContent = ' Yes, I have ';
    individualBtnContainerA.appendChild(readLabel);

    let individualBtnContainerB = document.createElement('div');
    individualBtnContainerB.classList.add('individualBtnContainer');
    radioBtnContainer.appendChild(individualBtnContainerB);

    let notReadBtn = document.createElement('input');
    notReadBtn.setAttribute('type', 'radio');
    notReadBtn.setAttribute('id', 'notRead');
    notReadBtn.setAttribute('name', 'readState');
    notReadBtn.classList.add('readState');
    notReadBtn.setAttribute('value', 'not read');
    individualBtnContainerB.appendChild(notReadBtn);

    let notReadLabel = document.createElement('label');
    notReadLabel.setAttribute('for', 'notRead');
    notReadLabel.classList.add('radioButtonLabel');
    notReadLabel.textContent = " No, I haven't ";
    individualBtnContainerB.appendChild(notReadLabel);

    let submitBtn = document.createElement('button');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.setAttribute('id', 'addBook');
    submitBtn.textContent = 'Add book';
    popupForm.appendChild(submitBtn);
    submitBtn.addEventListener('click', addBook);

    let returnBtn = document.createElement('button');
    returnBtn.setAttribute('id', 'return');
    returnBtn.textContent = 'Return';
    popupForm.appendChild(returnBtn);
    returnBtn.addEventListener('click', deleteForm);
}

// This function deletes all the html elements of the Form
function deleteForm(){
    let form = document.querySelectorAll('.popupForm');
    for(const el of form){
        el.remove();
    }
}

// this function loops through an array that contains the radio buttons and returns the value
// of the one thats selected
function displayRadioValue(){
    let radioBtn = document.getElementsByName('readState');
    for(let i = 0; i < radioBtn.length; i++){
        if(radioBtn[i].checked){
            return radioBtn[i].value;
        }
    }
}

// this is the 'Add Book' button from the form
function addBook(){
    // here I have to get all the elements this way because they are locked inside the showForm() function
    let title = (document.getElementById('title')).value;
    let author = (document.getElementById('author')).value;
    let pages = (document.getElementById('pages')).value;
    let readState = displayRadioValue();
    if(!title || !author || !pages || readState === undefined){
        alert("Please fill in all fields");
        return;
    };
    let book = new Book(title, author, pages, readState);
    addBookToLibrary(book);
    // this conditional makes sure the function isn't creating the button over and over again
    if(myLibrary.length === 1){
        showPlusButton();
    }
    clearDisplay();
    displayBooks();
    deleteForm();
    // this conditional makes sure the function isn't deleting the button over and over again
    if(myLibrary.length > 0 && myLibrary.length < 2){
        deleteNewBookButton();
    }
}

showNewBookButton();
