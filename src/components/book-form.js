import React, { Component } from 'react';

class BookForm extends Component {

  
    state={
       book: this.props.bookIndex, 
    }
    
    cancelClicked = () => {
     this.props.cancelClicked() 
    }    
    
    inputChanged = (e) => {
        const index = this.state.book
        index[e.target.name] = e.target.value
        this.setState({book: index})
    }
    
    saveClicked = () => {
        fetch('http://127.0.0.1:8000/api/books/',{
            method: 'POST',
            headers: {'Content-Type':'application/json',
                      'Authorization':`Token ${this.props.token}`},
            body:JSON.stringify(this.state.book)  
            }).then(resp => resp.json())
            .then(res => this.props.addBook(res))
            .catch(err => console.log(err))
    }
    
    updateClicked = () =>{
        fetch(`http://127.0.0.1:8000/api/books/${this.props.bookIndex.id}/`,{
            method: 'PUT',
            headers: {'Content-Type':'application/json',
                      'Authorization':`Token ${this.props.token}`},
            body:JSON.stringify(this.state.book)  
            }).then(resp => resp.json())
            .then(res => this.props.updateBook(res))
            .catch(err => console.log(err))
        
    }
    
    render(){
        return <div>
                   <h3> {this.props.bookIndex.id ? 'Update Form': 'New Form'}</h3>
                   <span>Title</span>
                   <br/>
                   <input type ='text'  name ='title' value={this.props.bookIndex.title} onChange={this.inputChanged}/>
                   <br/>
                   <span>Description</span>
                   <br/>
                   <textarea  name='description' value={this.props.bookIndex.description} onChange={this.inputChanged}/>
                   <br/>
                   { this.props.bookIndex.id ? <button onClick={this.updateClicked}>Update</button>:
                   <button onClick={this.saveClicked}>Save</button>
                    }
                   <button onClick={this.cancelClicked}>Cancel</button>
               </div>
    }
}

export default BookForm;