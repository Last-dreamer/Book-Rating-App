import React, { Component } from 'react';
import { withCookies } from 'react-cookie';

class Login extends Component{
     state = {
         credentials: {
             username:'',
             password:''
         },
         isLogin: true
     } 
     
     inputChanged = (evt) => {
         const cred =  this.state.credentials;
         cred[evt.target.name] = evt.target.value;
         this.setState({credentials: cred})
     }
     
     loginClicked = () => { 
        //  for log in ....
        if(this.state.isLogin){
        fetch(`http://127.0.0.1:8000/auth/`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(this.state.credentials)  
            })
            .then(res => res.json())
            .then(resp => {
                console.log(resp)
                    this.props.cookies.set('myToken', resp.token)
                    window.location.href = '/books'
                   })
            .catch(err => console.log(err))
       }
        else{
            // for registeratioin 
            fetch(`http://127.0.0.1:8000/api/users/`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(this.state.credentials)  
            })
            .then(res => res.json())
            .then(resp => {
                console.log(resp)
                    window.location.href = '/'
                   })
            .catch(err => console.log(err))
                
        }
     }
     
     toggleView = () => {
         this.setState({isLogin: !this.state.isLogin})
     }
     
    render(){
        return <div className='form'>
                <h1>{this.state.isLogin ? 'LogIn Form' : 'Register  here.!'}</h1>
                <br/>
                  <input type='text' placeholder='User Name' name='username' value={this.state.credentials.username} onChange={this.inputChanged}/>
                 <br/>
                  <input type='password'  placeholder='Password' name='password' value={this.state.credentials.password} onChange={this.inputChanged}/>
                <br/>  
                <button onClick = {this.loginClicked}>{this.state.isLogin ? 'LogIn' : "SignUP"}</button>
                <p onClick={this.toggleView}>{this.state.isLogin ? 'Don\'t Have any Account! Click here.?': 'Already having Account..!'}</p>
               </div>
    }
}

export default withCookies(Login);
