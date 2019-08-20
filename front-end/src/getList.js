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
        
    fetch(`http://localhost:3000/get-authrisedinfo`)
      .then(res => res.json())
      .then(
        (result) => {
           // console.log("sdfsf",result)
          this.setState({
            authitems: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }
componentDidMount() {
   this.getdetails()
}

  render(){
                      
    const data =this.state.authitems;
    const listItems = data.map((d) => <li key={d.key}>{d.value}</li>);
    console.log("data",data);

    return(
        <div className="d-flex justify-content-center bal-info">
            <ul className ="bal-detail">

            {listItems}
            </ul>
        </div>

    )
  }
}
export default GetAuthdetail
