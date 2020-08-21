import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
//import Relogin from './relogin';
import Users from './users';
import './login.css';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null,
      isLoaded: false,
      items: [],
      loginAttempt: 0,
      authenticated: false
    };
  }


  redirectLogin = () => {
    return (
      <Router>
        <div>
          <Switch>
            {this.state.authenticated ? (
              <Route path='/' exact component={Users} />
            ) : (
                <Route path='/' component={Login} />
              )}
          </Switch>
        </div>
      </Router>
    );
  };


  handleClick = (event) => {
    const authenticated =
      this.state.username === 'admin' && this.state.password === 'admin';

    if (authenticated) {
      this.setState({
        authenticated: true
      });
    } else {
      this.setState({
        authenticated: false,
        loginAttempt: 1
      });
    }
  }


  render() {
    const { authenticated, loginAttempt } = this.state;

    if (!authenticated) {
      return (
        <div>
          <MuiThemeProvider>
            <div>
              <AppBar title='Login' />
              <TextField
                hintText='Enter your Username'
                floatingLabelText='Username'
                onChange={(event, newValue) =>
                  this.setState({ username: newValue })
                }
              />
              <br />
              <TextField
                type='password'
                hintText='Enter your password'
                floatingLabelText='Password'
                onChange={(event, newValue) =>
                  this.setState({ password: newValue })
                }
              />
              <br />
              <RaisedButton
                label='Submit'
                primary={true}
                style={style}
                onClick={(event) => this.handleClick(event)}
              />

              <p className="fontcolor">{!authenticated && loginAttempt > 0 && "Please Enter Valid Username and Password"}</p>
            </div>
          </MuiThemeProvider>
        </div>
      );
    } else if (authenticated) {
      return this.redirectLogin();
    }
  }
}
const style = {
  margin: 15,
};
export default Login;
