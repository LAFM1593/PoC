
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Login from './src/screens/Login';
import Secured from './src/screens/Secured';
import {name as appName} from './app.json';

class Inicio extends Component {
  
  state = {
    isLoggedIn: false
  }

  render() {

    if (this.state.isLoggedIn) 
      return <Secured 
          onLogoutPress={() => this.setState({isLoggedIn: false})}
        />;
    else 
      return <Login 
          onLoginPress={() => this.setState({isLoggedIn: true})}
        />;
  }
 
}
 
AppRegistry.registerComponent(appName, () => Inicio);
