'use strict';

const booksList = document.querySelector('.books-list'),
  favoriteBooks = [],
  filters = [];

function render(){
  const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);

  for(let book in dataSource.books){
    const generatedHTML = bookTemplate(dataSource.books[book]),
      generatedDOM = utils.createDOMFromHTML(generatedHTML);

    booksList.appendChild(generatedDOM);
  }
}
function initActions(){
  const filterForm = document.querySelector('.filters');

  booksList.addEventListener('dblclick', function(event){
    const bookImageID = event.target.offsetParent.getAttribute('data-id');

    event.preventDefault();

    if(event.target.offsetParent.classList.contains('book__image')){
      if(!favoriteBooks.includes(bookImageID)){
        event.target.offsetParent.classList.add('favorite');
        favoriteBooks.push(bookImageID);
      } else {
        favoriteBooks.splice(favoriteBooks.indexOf(bookImageID), 1);
        event.target.offsetParent.classList.remove('favorite');
      }
    }
  });
  filterForm.addEventListener('click', function(event){
    if(event.target.tagName === 'INPUT' && event.target.type === 'checkbox' && event.target.name === 'filter'){
      if(event.target.checked){
        filters.push(event.target.value);
      } else {
        filters.splice(filters.indexOf(event.target.value), 1);
      }
    }
    filterBooks();
  });
}
/* [IN PROGRESS] filtering book list according to checked filters */
function filterBooks(){
  for(let book in dataSource.books){
    let shouldBeHidden = false;

    for(const filter of filters){
      if(!book.details[filter]) {
        shouldBeHidden = true;
        break;
      }
    }
    if(shouldBeHidden){
      const bookDOM = document.querySelector('.book__image[data-id="' + dataSource.books[book].id.value + '"]');

      bookDOM.classList.add('hidden');
    } else {
      const bookDOM = document.querySelector('.book__image[data-id="' + dataSource.books[book].id.value + '"]');

      bookDOM.classList.remove('hidden');
    }
  }
}

render();
initActions();
