import React, { Component } from 'react';

var FontAwesome = require('react-fontawesome');

class BookDetail extends Component {
  
  state = { 
           selectedStar: -1,
          }
  
  highLighted = (high) => (evt) => {
    this.setState({selectedStar: high})
  }
  
  rateClicked = (stars) => (evt) => {
    fetch(`http://127.0.0.1:8000/api/books/${this.props.seldbook.id}/rateBook/`,{
     method: 'POST',
     headers: { 'Content-Type': 'application/json',
       'Authorization':`Token ${this.props.token}`},
     body:JSON.stringify({stars: stars+1})  
     }).then(resp => resp.json())
     .then(res => this.getDetail())
     .catch(err => console.log(err))
 }
  
  getDetail = () => {
    fetch(`http://127.0.0.1:8000/api/books/${this.props.seldbook.id}/`,{
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
        'Authorization':`Token ${this.props.token}`}
        
      }).then(resp => resp.json())
      .then(res => this.props.updateBook(res))
      .catch(err => console.log(err))
  
  }

  
     render(){
        const book = this.props.seldbook;
         return <div>
                   { book ? (
                       <div>
                       <h3>{book.title}</h3>
                       <FontAwesome name='star' className={book.avg_no_rating > 0 ? 'orange': ''}/>
                       <FontAwesome name='star' className={book.avg_no_rating > 1 ? 'orange': ''}/>
                       <FontAwesome name='star' className={book.avg_no_rating > 2 ? 'orange': ''}/>
                       <FontAwesome name='star' className={book.avg_no_rating > 3 ? 'orange': ''}/>
                       <FontAwesome name='star' className={book.avg_no_rating > 4 ? 'orange': ''}/>
                       ({book.total_no_rating})
                       
                       <p>{book.description}</p>
                       <div className='rate-container'>
                         <p>Rate It</p>
                         {
                           [...Array(5)].map((e,i) => {
                              return  <FontAwesome name='star' key={i}
                                   className={this.state.selectedStar > i-1 ? 'orangered': ''} 
                                   onMouseEnter={this.highLighted(i)} onMouseLeave={this.highLighted(-1)}
                                   onClick={this.rateClicked(i)}/>
                                  
                           })
                         }
                       </div>
                      </div>
                    ) : null}
                     
                </div>
     }
 }


export default BookDetail;