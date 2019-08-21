import React from 'react';

import ReactDOM from 'react-dom';

            
class Createuser extends React.Component{
     constructor(props) {
        super(props);
         this.state = ({
            username:"",
            password:"",
             name:""
          });
         this.createUser = this.createUser.bind(this);
         this.updateUI = this.updateUI.bind(this);
         this.curaccount = this.curaccount.bind(this);
     }
    createUser(e){
        e.preventDefault();
        //hide form show loader
        var usname = this.state.username;
        var password = this.state.password;
        var user = this.state.user;
        console.log("__",usname,password);
        if(usname.length  == 0 || password.length ==0 || user == 0 ){
            alert("please enter credential.");
            return;
        }
        var dataParams= {username:usname,password:password,user:user}
        fetch(`http://localhost:3000/api/createUser`, {
            method: 'POST',
            headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
           
            body:JSON.stringify(dataParams),
        })
        .then((response) =>response.json())
        .then((responseJson) => {
//            console.log("login details",responseJson);
////            this.props.login(responseJson.status);
            this.props.login("LogOut");
        })
    }
    updateUI(e){
        const {value,id}=e.target;
        this.setState({
            [id]:value
        })
        
    }
  curaccount(){
      this.props.login("LogOut");
  }
  render(){
    return(
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first">
              <img className ="userico" src="../userico.png" id="icon" alt="user icon" />
            </div>

            <form>
                <input type="text" id="name" defaultValue={this.state.name} onChange ={this.updateUI} autoComplete="off" className="fadeIn second" name="login" placeholder="Enter Name" />
        
              <input type="text" id="username" defaultValue={this.state.username} onChange ={this.updateUI} autoComplete="off" className="fadeIn second" name="login" placeholder="Enter Username" />
        
              <input type="password" id="password" defaultValue={this.state.password} id="password" onChange ={this.updateUI}   autoComplete="off" className="fadeIn third" name="login" placeholder="Enter password" />
        
              <input type="submit" className="fadeIn fourth" onClick={this.createUser} value="Log In" />
            </form>
            <div id="formFooter">
              <a className="underlineHover" onClick={this.curaccount} href="#">Already have an Account?</a>
            </div>
          </div>
        </div>
    )
  }
}
export default Createuser
