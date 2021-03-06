import React from 'react';

import ReactDOM from 'react-dom';

            
class Login extends React.Component{
     constructor(props) {
        super(props);
         this.state = ({
            username:"",
            password:""
          });
         this.login = this.login.bind(this);
         this.updateUI = this.updateUI.bind(this);
         this.createAc =this.createAc.bind(this);
     }
    login(e){
        e.preventDefault();
        //hide form show loader
        var usname = this.state.username;
        var password = this.state.password;
        console.log("__",usname,password);
//        if(usname.length  == 0 || password.length ==0){
//            alert("please enter credential.");
//            return;
//        }
        console.log("username", usname);
        console.log("password", password);
        var dataParams= {username:usname,password:password}
        fetch(`http://localhost:3000/api/login`, {
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
            
            if(responseJson.message == "Not found user"){
                this.props.login("LogOut");
            }else{
            localStorage.removeItem('current_user');
            console.log("stored in local");
            var user = {name:"aaa",key:responseJson.token}
            localStorage.setItem('current_user',responseJson.token);
                this.props.login("LogedIn");
            }
//            this.props.login("LogedIn");
        })
    }
    updateUI(e){
        const {value,id}=e.target;
        this.setState({
            [id]:value
        })
        
    }
    createAc(e){
        const {id} = e.target;
        this.props.login(id);
    }
  
  render(){
    return(
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first">
              <img className ="userico" src="../userico.png" id="icon" alt="user icon" />
            </div>

            <form>
              <input type="text" id="username" defaultValue={this.state.username} onChange ={this.updateUI} autoComplete="off" className="fadeIn second" name="login" placeholder="Enter Username" />
        
              <input type="password" id="password" defaultValue={this.state.password} id="password" onChange ={this.updateUI}   autoComplete="off" className="fadeIn third" name="login" placeholder="Enter password" />
        
              <input type="submit" className="fadeIn fourth" onClick={this.login} value="Log In" />
            </form>
            <div id="formFooter">
              <a className="underlineHover" id="create" onClick={this.createAc} href="#">Dont have account ?</a>
            </div>
          </div>
        </div>
    )
  }
}
export default Login
