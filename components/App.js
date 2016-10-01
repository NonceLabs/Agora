import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TabBarIOS,
  Animated,
  PanResponder,
  Easing,
  Modal
} from 'react-native';

import Icon from  'react-native-vector-icons/MaterialIcons'
import { Header,SwipeHeader } from './widgets/Header'
import Home from './Home'
import Square from './Square'
import Fez from './Fez'
import Noti from './Noti'
import EvilIcon from  'react-native-vector-icons/EvilIcons'
import Menu from './Menu'
const {height, width} = Dimensions.get('window')
import s from './widgets/Styles'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedTab: '探索',
      theta: new Animated.Value(0),
      slideTo: 'right',
      animateV: 0,
      offsetLimit: props.defaultOffset
    }
  }
  componentWillMount() {
    if (this.props.distance!=undefined) {
      this.setState({offsetLimit: this.props.distance})
    }
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        
      },
      onPanResponderMove: (evt, gestureState) => {
        const { offsetLimit } = this.state
        if (gestureState.dx > 30 && gestureState.dx<offsetLimit) {
          this.setState({slideTo: 'right'})
          this._animate(gestureState.dx-30)
        }
        if (gestureState.dx < -30 && -gestureState.dx<offsetLimit) {
          this.setState({slideTo: 'left'})
          this._animate((offsetLimit-Math.abs(gestureState.dx+30)))
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        const { offsetLimit } = this.state
        this._animate(this.state.slideTo=='left'?0:offsetLimit)
      },
      onPanResponderTerminate: (evt, gestureState) => {

      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  }

  _animate(v) {
    this.setState({animateV:v})
    Animated.timing(this.state.theta, {
      toValue: v,
      easing: Easing.linear,
      friction: 12,
      duration: 20
    }).start();
  }

  open(){
    const { offsetLimit } = this.state
    this._animate(offsetLimit)
  }
  close(){
    this._animate(0)
  }
  _toggle(){
    const { animateV,offsetLimit } = this.state
    let v = -1
    if (Math.abs(animateV-offsetLimit)<5) {
      this.close()
    }else if (Math.abs(animateV)<5) {
      this.open()
    }
  }
  _renderContent(title) {
    let content = null,head = <Header/>
    const { navigator } = this.props
    switch(title){
      case "探索":
        content = (
          <Home navigator={navigator}/>
        )
        head = (
          <Header
            left={{
              icon: "navicon",
              call: ()=>{}
            }}
            center={{title:'探索'}}
            />
        )
        break;
      case "我本":
        content = (
          <Fez navigator={navigator}/>
        )
        break;
      case "广场":
        content = (
          <Square navigator={navigator}/>
        )
        break;
      case "消息":
        content = (
          <Noti navigator={navigator} />
        )
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
    const { navigator,defaultOffset } = this.props
    const { offsetLimit,animateV } = this.state

    return (
      <View style={styles.flipCardContainer} {...this._panResponder.panHandlers}>
        <Animated.View style={[styles.flipCard, {backgroundColor: 'red',position:'absolute',left: 0,top: 0}]}>
          <Menu />
        </Animated.View>
        <Animated.View style={[
          styles.flipCard,{backgroundColor: 'blue',top: 0,left: this.state.theta}]}>
          <View>
            {animateV>0 && (<View style={s.mask}>
            </View>)}
            <Header
              left={{
                icon: "navicon",
                call: ()=>{ this._toggle() }
              }}
              center={{title:'探索'}}
              />
            <Home  navigator={navigator}/>
          </View>
        </Animated.View>
      </View>
    )
  }

  renderAsTab(){
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
                  icon={require('../assets/ibar.png')}
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
  defaultOffset: width*0.6,
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
