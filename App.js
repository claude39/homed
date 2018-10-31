import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux'
import Login from './components/LoginContainer'
import Register from './components/RegisterContainer'
import Home from './components/Home'
import AdminHome from './components/AdminHome'
import RemedyForm from './components/RemedyForm'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root" headerMode="none">
          {/* <Scene key="login" initial component={Login} />
          <Scene key="register" component={Register} />
          <Scene key="home" component={Home} />  */}
          <Scene key="adminhome" component={AdminHome} initial />
          <Scene key="remedyform" component={RemedyForm} />
        </Scene>
      </Router >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
