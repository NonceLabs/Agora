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
  Navigator
} from 'react-native';
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './components/App'

class Menu extends Component {
  render(){
    return (
      <View>
        <Text>{"Hi, bitch"}</Text>
      </View>
    )
  }
}


class Agora extends Component {
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



AppRegistry.registerComponent('Agora', () => Agora);
