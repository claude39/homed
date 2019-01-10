import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux'
import Login from './components/LoginContainer'
import Register from './components/RegisterContainer'
import Home from './components/Home'
import AdminHome from './components/AdminHome'
import RemedyForm from './components/RemedyForm'
import IllnessForm from './components/IllnessForm'
import DataViewer from './components/DataViewer'
import HistoryComponent from './components/History'


export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root" headerMode="none">
          <Scene key="login" component={Login} initial />
          <Scene key="register" component={Register} />
          <Scene key="home" component={Home} />
          <Scene key="adminhome" component={AdminHome} />
          <Scene key="illnessform" component={IllnessForm} />
          <Scene key="remedyform" component={RemedyForm} />
          <Scene key="dataviewer" component={DataViewer} />
          <Scene key="history" component={HistoryComponent} />
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
