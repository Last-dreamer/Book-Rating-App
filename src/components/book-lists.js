import React from 'react';
var FontAwesome = require('react-fontawesome');

function BookList(props){
    
    const bookClick = (book) =>{
        props.bookClicked(book)
    }
    
    const editClicked = bookIndex => {
        props.editClicked(bookIndex)
    }
    
    const newBook= () => {
          props.newBook()
    }
    
   const trashClicked = (bookIndex) => {
        fetch(`http://127.0.0.1:8000/api/books/${bookIndex.id}/`,{
            method: 'DELETE',
            headers: {'Content-Type':'application/json',
                      'Authorization':`Token ${props.token}`}
            }).then(resp => props.bookRemoved(bookIndex))
            .catch(err => console.log(err))
    
    }

     return (
            <div>
               { 
                props.allbooks.map( book => {
                    return <div key={book.id} className='book-item'>
                        <h4 onClick={() => bookClick(book)}>{book.title}</h4>
                          <FontAwesome name='edit' onClick={() => editClicked(book)}/>
                          <FontAwesome name='trash' onClick={() => trashClicked(book)}/>
                          </div>
                })     
              }
               <button onClick={newBook}>Add Book</button>
            </div>       
        )
}

export default BookList;