import React from 'react';
import ProfilePic from './assets/Profile.png';


export default class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    //const history = useHistory();
    const { isLoaded, items } = this.state;
    return (
      <div className="divalign">
        <div> <h1>Meet The Team</h1></div>
        <hr></hr>
        {isLoaded && items.length > 0 && items.map((item) => {
          return <p><img src={ProfilePic} ></img>   {item.name}</p>
        })}
      </div>
    );
  }

}