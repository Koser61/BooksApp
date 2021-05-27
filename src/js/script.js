'use strict';

const select = {
    template: {
      book: '#template-book',
    },
    dom: {
      book_list: '.books-list',
    }
  },
  templates = {
    book: Handlebars.compile(document.querySelector(select.template.book).innerHTML),
  };

function render(){
  for(let book in dataSource.books){
    const generatedHTML = templates.book(dataSource.books[book]),
      booksList = document.querySelector(select.dom.book_list),
      generatedDOM = utils.createDOMFromHTML(generatedHTML);

    booksList.appendChild(generatedDOM);
  }
}

render();
