import React from 'react';

import ReactDOM from 'react-dom';

            
class GetAuthdetail extends React.Component{
     constructor(props) {
        super(props);
         this.state = ({
            isLoaded: true,
            authitems: []
          });
         this.getdetails = this.getdetails.bind(this);
         
     }
    getdetails(){
        var _gr = localStorage.getItem('current_user');
        if ( typeof _gr == "undefined"){
           //enable login button
            return
            
        }else{
            fetch(`http://localhost:3000/api/postsLis`, {
            method: 'POST',
            headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization':'Bearer '+_gr
            }
        }).then((response) =>response.json())
        .then((responseJson) => {
            console.log("--data",responseJson)
            
            if( responseJson.message == "session expired"){
                //this.props.login("LogOut");
            }else{
                this.setState({
                  authitems: responseJson.message
                })
            }
                
        })
    }
    }
componentDidMount() {
   this.getdetails()
}

  render(){
                      
    const data =this.state.authitems;
    const listItems = data.map((d) => <li key={d.id}>{d.label}</li>);
    console.log("data",data);
      if(listItems.length >0){
              return(
            <div className="">
                <label className="">Authorised data information</label>
                <ul className ="bal-detail">
                {listItems}
                </ul>
            </div>

        )
      }else{
          return(
            <div className="">
                <span className="error">Your session got expired.please login again</span>
            </div>

        )
      }
    
  }
}
export default GetAuthdetail
