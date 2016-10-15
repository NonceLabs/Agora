/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  PushNotificationIOS,
  AppStateIOS,
  AppState
} from 'react-native';
import { Provider } from 'react-redux'
import { store } from './store/store'
import { io } from './store/io'
import App from './components/App'
import codePush from 'react-native-code-push'

class Agora extends Component {
  componentDidMount() {

    PushNotificationIOS.addEventListener('notification',(noti)=>{
      console.log(noti.getMessage());
    })
    PushNotificationIOS.getApplicationIconBadgeNumber((badge)=>{
      if (badge > 0) {
        PushNotificationIOS.setApplicationIconBadgeNumber(0)  
      }
    })

    AppState.addEventListener('change',(newState)=>{
      switch(newState){
        case 'inactive':
          
          break;
        case 'background':
          io.disconnect()
          break;
        case 'active':
          // codePush.sync()
          io.connect()
          break;
        default:
          break;
      }
    })
  }
  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('notification',(noti)=>{
      console.log(noti.getMessage());
    })

    AppState.addEventListener('change',(newState)=>{

    })
  }
  
  renderScene(route, navigator) {
    if (route.id == 'tab-bar') {
      return <App navigator={navigator} />;
    } else {
      return route.nav; 
    }
  }
  render() {
    const main = (
      <Navigator
        ref="navigator"
        renderScene={this.renderScene.bind(this)}
        initialRoute={{id: 'tab-bar'}}
      />
    )
    
    return (
      <Provider store={store}>
        {main}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});



AppRegistry.registerComponent('Agora', () => codePush(Agora));
