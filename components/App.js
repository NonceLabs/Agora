import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TabBarIOS
} from 'react-native';

import Icon from  'react-native-vector-icons/MaterialIcons'
import { Header } from './widgets/Header'
import Home from './Home'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedTab: '探索'
    }
  }
  _renderContent(title) {
    let content = null,head = null
    const { navigator } = this.props
    switch(title){
      case "探索":
        content = (
          <Home navigator={navigator}/>
        )
        head = (
          <Header
            right={{
              icon: 'map',
              title: '',
              call: ()=>{

              }
            }}
          />
        )
        break;
      case "我本":
        content = (
          <Home navigator={navigator}/>
        )
        break;
      case "广场":
        content = (
          <Home navigator={navigator}/>
        )
        break;
      default:
        break;
    }
    return (
      <View>
        {head}
        {content}
      </View>
    );
  }
  render() {
    const badge = {
      explore: 0,
      monolith: 0,
      social: 0,
      account: 0
    }

    const { selectedTab } = this.state
    const { tabs } = this.props
    return (
        <TabBarIOS
          tintColor="white"
          barTintColor="darkslateblue"
          style={styles.tabBar}>
          {tabs.map((t,idx)=>{
            if (idx==3) {
              return (
                <TabBarIOS.Item
                  key={idx}
                  renderAsOriginal
                  title={t.title}
                  icon={require('../assets/Fez.icns')}
                  selectedIcon={require('../assets/ibared.png')}
                  selected={selectedTab === t.title}
                  onPress={() => {
                    this.setState({
                      selectedTab: t.title,
                    });
                  }}>
                  {this._renderContent(t.title)}
                </TabBarIOS.Item>
              )
            }
            return (
              <Icon.TabBarItem
                key={idx}
                title={t.title}
                badge={null}
                iconName={t.icon}
                selectedIconName={t.icon}
                selected={selectedTab === t.title}
                onPress={() => {
                  this.setState({selectedTab: t.title});
                }}>
                {this._renderContent(t.title)}
              </Icon.TabBarItem>
            )
          })}
        </TabBarIOS>
      );
  }
}

const styles = StyleSheet.create({
  tabBar:{
    height: 0,
    backgroundColor: 'darkslateblue'
  },
  wrapper:{
    flex: 1,
  },
});

App.defaultProps = {
  tabs: [{
    icon: 'polymer',
    title: '探索',    
  },{
    icon: 'dashboard',
    title: '广场'
  },{
    icon: 'chat',
    title: '消息'
  },{
    icon: 'child-care',
    title: '我本'
  }]
}

function mapStateToProps(state) {
  return {
    
  }
}

function mapDispatchToProps(dispatch) {
  return {
 
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


            // return (
            //   <TabBarIOS.Item
            //     key={idx}
            //     renderAsOriginal
            //     title={t.title}
            //     icon={require('../assets/bar.png')}
            //     selectedIcon={require('../assets/bar.png')}
            //     selected={this.state.selectedTab === t.title}
            //     onPress={() => {
            //       this.setState({
            //         selectedTab: t.title,
            //       });
            //     }}>
            //     {this._renderContent(t.title)}
            //   </TabBarIOS.Item>
            // )
