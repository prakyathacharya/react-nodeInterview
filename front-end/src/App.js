import React from 'react';

import ReactDOM from 'react-dom';
import './App.css';
import Getdetails from './getDetails';
import Adduser from './login';
import GetAuthdetail from './getList'


class App extends React.Component{
        constructor(props) {
        super(props);
         this.state = ({
            login:"inValid",
             note:""
          });
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
     }
    login(val){
        this.setState({
            login:val
        })
    }
    logout(){
        this.setState({
            login:"inValid",
            note:"Please login to see authorised data."
        })
    }


  render(){
      if(this.state.login == "inValid"){
        return(
            <div className="container">
                <label className="d-flex justify-content-center">Balance Details</label>
                <Getdetails /> 
                <p className="d-flex justify-content-center errorCode">{this.state.note}</p>
                <Adduser login ={this.login}/>
            </div>
        )
          
      }else{
          
          return(<div className="container">
                 <label className="d-flex justify-content-center">Balance Details</label>
                 <Getdetails />
                 <label className="d-flex justify-content-center">Authorised data information</label>
                 <GetAuthdetail />
                 <div className="d-flex justify-content-center"><button className="text-center btn btn-danger" onClick={this.logout} >Logout</button>
                 </div>
                 
                 
                 </div>)
      }

  }
}
export default App;
