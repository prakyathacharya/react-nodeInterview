import React from 'react';

import ReactDOM from 'react-dom';
import './App.css';
import Getdetails from './getDetails';
import Login from './login';
import GetAuthdetail from './getList';
import Createuser from './createUser';


class App extends React.Component{
        constructor(props) {
        super(props);
         this.state = ({
            login:"",
             note:"",
             current_user :""
          });
        this.renderBTN = this.renderBTN.bind(this);
        this.logout = this.logout.bind(this);
        this.togbtn = this.togbtn.bind(this);
        this.login = this.login.bind(this);
     }
    togbtn(e){
        const {id}=e.target
        localStorage.removeItem('current_user');
        this.renderBTN(id);
        this.setState({
            login:""
        })
        window.location.reload();
    }
    login(e){
        const {id}=e.target
        console.log("testing__",id);
        this.setState({
            login:"LogOut"
        })
    }
    renderBTN(val){
    console.log("button___-",val)
        this.setState({
            login:val
        })
    }
    logout(){
        this.setState({
            login:"",
            note:"Please login to see authorised data."
        })
    }
//    componentDidMount() {
//        const fd = localStorage.getItem('current_user') === 'true';
//        const user = fd ? localStorage.getItem('current_user') : '';
//        var df = localStorage.getItem('current_user');
//        console.log("sdafhsd__",df);
//        this.setState({ current_user: user});
//    }

  render(){
     if(this.state.login == "LogOut" ){          
          return(
              <div className="container">
                 <Login login ={this.renderBTN}/>
                </div>
                )
      }else if( this.state.login == "create"){          
          return(
              <div className="container">
                 <Createuser login ={this.renderBTN}/>
                </div>
                )
      }else{
          return(
          <div className="container">
                <label className="">Balance Details</label>
                <Getdetails /> 
                <GetAuthdetail login ={this.renderBTN} />
                <p className="">{this.state.note}</p>
              
              {this.state.login ?<a id ="test" className="btn btn-info" onClick={this.togbtn}  >logout</a>:<a id ="LogOut" className="btn btn-info" onClick={this.login}  >login</a>}
            </div>
            )
      }

  }
}
export default App;
