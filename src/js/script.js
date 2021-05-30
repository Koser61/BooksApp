'use strict';

const booksList = document.querySelector('.books-list'),
  favoriteBooks = [];

function render(){
  const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);

  for(let book in dataSource.books){
    const generatedHTML = bookTemplate(dataSource.books[book]),
      generatedDOM = utils.createDOMFromHTML(generatedHTML);

    booksList.appendChild(generatedDOM);
  }
}
function initActions(){
  booksList.addEventListener('dblclick', function(event){
    const bookImageID = event.target.offsetParent.getAttribute('data-id');
    console.log(event.target.offsetParent);
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
}

render();
initActions();
