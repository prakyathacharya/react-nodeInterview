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
        
        fetch(`http://localhost:3000/api/posts`, {
            method: 'POST',
            headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        })
        .then((response) =>response.json())
        .then((responseJson) => {
            console.log("get details____",responseJson.message.items);
                      this.setState({
            items: responseJson.message.items
          });
            
        })

    }
componentDidMount() {
   this.getdetails()
}

  render(){
    var items =this.state.items;
      console.log("sdf",items);
                      
    const data =items =this.state.items;
    const listItems = data.map((d) => <li key={d.id}>{d.label}</li>);
    return(
        <div className="">
        
            <ul className ="bal-detail">

            {listItems}
            </ul>
        </div>

    )
  }
}
export default GetDetails
