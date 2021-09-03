const searchBook = () => {
    const searchField = document.getElementById("Search-field");
    const searchText = searchField.value;
    //console.log(searchText);
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => displayBooks(data.docs))
    searchField.value = "";
}
searchBook()

const displayBooks = books => {

    //Number of books
    let numBooks = books.length;
    console.log(books);

    const bookInject = document.getElementById('numof-books');
    bookInject.textContent = '';
    const divv = document.createElement('div');
    divv.innerHTML = `
    <h3 class="num-books">Result of books: ${numBooks}</h3>
    `
    bookInject.appendChild(divv);

    if (books.length == 0) {
        const bookInject = document.getElementById('numof-books');
        bookInject.textContent = '';
        const divv = document.createElement('div');
        divv.innerHTML = `
    <h3 class="num-books">Nothing Found/Search above</h3>
    `
        bookInject.appendChild(divv);
    }

    //Get element id
    const injectThere = document.getElementById("inject-here");
    injectThere.textContent = '';

    //Start loop
    books.forEach(element => {

        //Book title
        let bookName = element.title;
        let bookFinalName;
        if (bookName.length > 0) {
            bookFinalName = bookName;
        }
        else {
            bookFinalName = 'Empty Name';
        }

        //Book Author
        let bookAuthor = element.author_name;
        let authorFinalName;
        if (bookAuthor === undefined) {
            authorFinalName = 'Empty Author';
        }
        else {
            authorFinalName = bookAuthor;
        }

        //First published
        let firstPublished = element.first_publish_year;
        let firstFinalPublished;
        if (firstPublished > 0) {
            firstFinalPublished = firstPublished;
        }
        else {
            firstFinalPublished = 'Empty Year';
        }

        //image
        let imgAddress = element.cover_i;
        let img;
        if (imgAddress === undefined) {
            img = 'img/cover.jpg';
        }
        else {
            img = `https://covers.openlibrary.org/b/id/${imgAddress}-M.jpg`;
        }
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${img}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="book-title">Book Name: ${bookFinalName}</h5>
                <h5 class="book-author">Author: ${authorFinalName}</h5>
                <h5 class="book-publisher">Publisher: ${element.publisher}</h5>
                <h5 class="publish-year">First Publish Year: ${firstFinalPublished}</h5>
            </div>
        </div>`
        injectThere.appendChild(div);

    })
}