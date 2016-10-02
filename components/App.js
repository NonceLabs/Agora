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
  Modal,
  TouchableOpacity,
  TextInput
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
import { openMenu,selectMenuitem } from '../actions/OpAction'
import TextModal from './widgets/TextModal'
import History from './History'
import Hot from './Hot'
import Setting from './Setting'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      theta: new Animated.Value(0),
      slideTo: 'right',
      animateV: 0,
      offsetLimit: props.defaultOffset,
      feedback: "",
      addons: []
    }
  }
  componentWillMount() {
    if (this.props.distance!=undefined) {
      this.setState({offsetLimit: this.props.distance})
    }
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,

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
    this.props.openMenu()
  }
  close(){
    this._animate(0)
    this.props.openMenu()
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
  
  render() {
    const { navigator,defaultOffset,op,selectMenuitem } = this.props
    const { offsetLimit,animateV } = this.state

    return (
      <View style={s.flipCardContainer} {...this._panResponder.panHandlers}>
        <Animated.View style={[s.flipCard, {backgroundColor: 'red',position:'absolute',left: 0,top: 0}]}>
          <Menu closeMenu={this.close.bind(this)} selectMenuitem={selectMenuitem}/>
        </Animated.View>
        <Animated.View style={[
          s.flipCard,{backgroundColor: 'blue',top: 0,left: this.state.theta}]}>
          {this.renderMain(op.menuItem,navigator,op.menuOpen)}
        </Animated.View>
        {op.menuItem=="反馈" && (
          <TextModal title="意见与建议" submit={()=>{}} btnText="发送" hide={()=>{ this.props.selectMenuitem("首页")} }/>
        )}
      </View>
    )
  }

  renderMain(item,navigator,menuOpen){
    let head = (
      <Header
        left={{
          icon: menuOpen ? "arrow-left" : "navicon",
          call: ()=>{ this._toggle() }
        }}
        center={{title:''}}
        />
    )
    let content = null 
    switch(item){
      case "我":
        content = <Fez />
        head = (
          <Header
            left={{
              icon: menuOpen ? "arrow-left" : "navicon",
              call: ()=>{ this._toggle() }
            }}
            right={{icon:'pencil',call:()=>{}}}
            />
        )
        break;
      case "消息":
        content = <Noti />
        break;
      case "反馈":
        head = null
        content = (
          <View style={s.root}>
          </View>
        )
        break;
      case "历史":
        content = (
          <History />
        )
        break;
      case "热门":
        content = (
          <Hot />
        )
        break;
      case "设置":
        content = (
          <Setting />
        )
        break;
      default: 
        content = <Home navigator={navigator}/>
    }

    return (
      <View style={{borderRightWidth: 1,}}>
        {head}
        {content}
      </View>
    )
  }
}

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
    op: state.op
  }
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: bindActionCreators(openMenu, dispatch),
    selectMenuitem: bindActionCreators(selectMenuitem, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
