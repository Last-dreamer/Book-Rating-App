import React, { Component } from 'react';
import './App.css';
import BookList from './components/book-lists'
import BookDetail from './components/book-details'
import BookFrom from './components/book-form'
import { withCookies }  from 'react-cookie';

var FontAwesome  =  require('react-fontawesome');

class App extends Component{

//  state variables to be changed...
  state = {
    AllBook: [],
    selectedBook: null,
    editedBook: null,
    Token: this.props.cookies.get('myToken')   
  }

// when app start.... it will be called
 componentDidMount(){
   if(this.state.Token){
   // getting the data from API
   fetch('http://127.0.0.1:8000/api/books/',{
     method: 'GET',
     headers: {'Authorization':`Token ${this.state.Token}`}  
     }).then(resp => resp.json())
     .then(res => this.setState({AllBook: res}))
     .catch(err => console.log(err))
    }else{
      window.location.href='/'
    }
 }

 // getting the index of which book is clicked.....
  bookClicked = (selBook) => {
    this.setState({selectedBook: selBook, editBook: null})
 }
  
  // edit icon  is clicked and getting the index... 
  editClicked =(bookIndex) => {
    this.setState({editedBook: bookIndex})
  }
  
  // new book index is getting...
  newBook =() => {
    this.setState({editedBook: {'title':'', 'description': ''}})
  }
  
  // add new book
  addBook = (newBook) => {
    this.setState({AllBook: [...this.state.AllBook, newBook]})
  }
   
   // updating the book 
   updateBook = (currentBook) => {
     this.setState({editedBook: currentBook})
   }
   
   // book removed 
   bookremoved = (seldBook) => {
     const rbook = this.state.AllBook.filter(book => book.id !== seldBook.id)
     this.setState({AllBook: rbook, selectedBook:null})
   }
   
 render(){
    return (
       <div className="App">
             <h1><span>
             <FontAwesome name='book'/>
             </span>
             Book Lists</h1>
           <div className='book-container'>
             <BookList allbooks={this.state.AllBook} bookClicked={this.bookClicked} editClicked={this.editClicked} 
               newBook={this.newBook} bookRemoved={this.bookremoved} token={this.state.Token}/>
              
              { !this.state.editedBook ? 
               <BookDetail seldbook={this.state.selectedBook} updateBook={this.bookClicked} token={this.state.Token}/>
                 : 
             <BookFrom bookIndex={this.state.editedBook} cancelClicked={this.editClicked}  addBook={this.addBook}
              updateBook={this.updateBook} token={this.state.Token}/>
            }
           </div>
       </div>
    )
  }

}

export default withCookies(App);