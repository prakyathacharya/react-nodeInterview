import React from 'react';

import ReactDOM from 'react-dom';

            
class GetDetails extends React.Component{
     constructor(props) {
        super(props);
         this.state = ({
            isLoaded: true,
            items: []
          });
         this.getdetails = this.getdetails.bind(this);
         
     }
    getdetails(){
        
    fetch(`http://localhost:3000/get-list`)
      .then(res => res.json())
      .then(
        (result) => {
           // console.log("sdfsf",result)
          this.setState({
            items: result
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
    var items =this.state.items;
      console.log("sdf",items);
                      
    const data =items =this.state.items;
    const listItems = data.map((d) => <li key={d.key}>{d.balance}</li>);
    return(
        <div className="d-flex justify-content-center bal-info">
        
            <ul className ="bal-detail">

            {listItems}
            </ul>
        </div>

    )
  }
}
export default GetDetails
