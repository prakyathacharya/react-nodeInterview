import React from 'react';

import ReactDOM from 'react-dom';

            
class Adduser extends React.Component{
     constructor(props) {
        super(props);
         this.state = ({
            username:"",
            password:""
          });
         this.login = this.login.bind(this);
         this.updateUI = this.updateUI.bind(this);
     }
    login(e){
        e.preventDefault();
        //hide form show loader
        var usname = this.state.username;
        var password = this.state.password;
        if(usname.length  == "" ||  password.length ==""){
            alert("please enter credential.");
            return;
        }
        console.log("username", usname);
        console.log("password", password);
        var dataParams= {username:usname,password:password}
        fetch(`http://localhost:3000/login`, {
            method: 'POST',
            headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
           
            body:JSON.stringify(dataParams),
        })
        .then((response) =>response.json())
        .then((responseJson) => {
            this.props.login(responseJson.status);
            
        })
    }
    updateUI(e){
        const {value,id}=e.target;
        this.setState({
            [id]:value
        })
        
    }
  
  render(){
    return(
        
        <div className ="d-flex justify-content-center add-user">
        <form onSubmit={this.login}>
              <div className="form-group">
                <label htmlfor="email">User Name:</label>
                <input type="text" defaultValue={this.state.username} onChange ={this.updateUI}className="form-control" id="username" />
              </div>
              <div className="form-group">
                <label htmlfor="pwd">Password:</label>
                <input type="password" className="form-control" defaultValue={this.state.password} id="password" onChange ={this.updateUI} />
              </div>
              <button type="submit" className="btn btn-info" >Login</button>
        </form>
        </div>

    )
  }
}
export default Adduser
