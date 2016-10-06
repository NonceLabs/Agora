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
import { Header,HomeHeader } from './widgets/Header'
import Home from './Home'
import Square from './Square'
import Fez from './Fez'
import Noti from './Noti'
import EvilIcon from  'react-native-vector-icons/EvilIcons'
import Menu from './Menu'
const {height, width} = Dimensions.get('window')
import s from './widgets/Styles'
import { openMenu,selectMenuitem,feedback } from '../actions/OpAction'
import { fetchUser,updateFez,locateFez } from '../actions/FezAction'
import { fetchTopics } from '../actions/TopicAction'

import TextModal from './widgets/TextModal'
import FezModal from './widgets/FezModal'
import History from './History'
import Hot from './Hot'
import Setting from './Setting'

const offsetLimit = width*0.7
const timeLimit = 120

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      offsetX: new Animated.Value(0),
      slideTo: 'right',
      animateV: 0,
      feedback: "",
      open: false,
      fezModalVisible: false
    }
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState)=> true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        return false
      },
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        
        return false
      },
      
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.x0 < 10) {
          if (gestureState.dx > 30 && gestureState.dx<offsetLimit+30) {
            // console.log(gestureState);
            this.state.offsetX.setValue(gestureState.dx-30)
          }
          if (gestureState.dx>=offsetLimit+30) {
            this.setState({open: true});
            this.props.openMenu(true)
          }          
        }
        if (this.state.open) {
          let offsetX = offsetLimit+gestureState.dx-30
          offsetX = offsetX <= 0 ? 0 : offsetX
          if (offsetX==0) {
            this.setState({open: false});
            this.props.openMenu(false)
          }
          if (gestureState.dx < -30 && -gestureState.dx<offsetLimit) {
            // console.log(gestureState.dx);
            this.state.offsetX.setValue(offsetX)
          }          
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        const ox = this.state.offsetX._value
        // console.log(this.state.offsetX);
        if (ox < width*0.3) {
          this._animate(0, (ox*timeLimit)/(width*0.6))
          this.setState({open: false});
          this.props.openMenu(false)
        }else{
          this._animate(offsetLimit, ((offsetLimit-ox)*timeLimit)/(width*0.6))
          this.setState({open: true});
          this.props.openMenu(true)
        }
        // this._animate(this.state.slideTo=='left'?0:offsetLimit,10)
      }      
    });
  }

  componentDidMount() {

    const uid = '57f1f59b46df4f1ebd65053a'//'57f64f59eef28e59742c3132'
    this.props.fetchUser(uid)
    this._locate(uid)    
  }
  
  _locate(uid){
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = pos.coords
        this.props.fetchTopics({
          long: coords.longitude,
          lat: coords.latitude,
          page: 1,
          uid
        })
        this.props.locateFez(coords)
        console.log(coords);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
  _animate(v, dur) {
    this.setState({animateV:v})
    Animated.timing(this.state.offsetX, {
      toValue: v,
      easing: Easing.linear,
      friction: 12,
      duration: dur
    }).start();
  }

  open(){
    this._animate(offsetLimit,timeLimit)
    this.props.openMenu(true)
  }
  close(){
    this._animate(0,timeLimit)
    this.props.openMenu(false)
  }
  _toggle(){
    const { animateV } = this.state
    let v = -1
    if (Math.abs(animateV-offsetLimit)<5) {
      this.close()
    }else if (Math.abs(animateV)<5) {
      this.open()
    }
  }
  
  render() {
    const { navigator,defaultOffset,op,selectMenuitem,fez,updateFez } = this.props
    const { animateV,fezModalVisible } = this.state

    return (
      <View style={s.flipCardContainer} {...this._panResponder.panHandlers}>
        {fezModalVisible && (
          <FezModal fez={fez} hide={()=> this.setState({fezModalVisible:false})} submit={(nfez)=>{
            updateFez(fez._id,{
              nickname: nfez.nickname,
              gender: nfez.gender,
              avatarUrl: nfez.avatarUrl
            })
          }} btnText={"更新"}/>
        )}
        
        <Animated.View style={[s.flipCard, {backgroundColor: 'red',position:'absolute',left: 0,top: 0}]}>
          <Menu closeMenu={this.close.bind(this)} selectMenuitem={selectMenuitem}/>
        </Animated.View>
        <Animated.View style={[
          s.flipCard,{backgroundColor: 'blue',top: 0,left: this.state.offsetX}]}>
          {this.renderMain(op.menuItem,navigator,op.menuOpen)}
        </Animated.View>
        {op.menuItem=="反馈" && (
          <TextModal title="意见与建议" submit={(content, addons)=>{
            feedback({
              content,
              addons,
              date: new Date(),
              author: {
                id: fez._id,
                nickname: fez.nickname,
                avatarUrl: fez.avatarUrl
              },
            })
          }} btnText="发送" hide={()=>{ this.props.selectMenuitem("首页")} }/>
        )}
      </View>
    )
  }

  renderMain(item,navigator,menuOpen){
    const { fez,updateFez } = this.props
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
            right={{icon:'pencil',call:()=>{ this.setState({fezModalVisible:true});}}}
            />
        )
        break;
      case "消息":
        content = <Noti navigator={navigator} toggle={this._toggle.bind(this)} menuOpen={this.props.op.menuOpen}/>
        head = null
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
          <History navigator={navigator} toggle={this._toggle.bind(this)} menuOpen={this.props.op.menuOpen}/>
        )
        head = null
        break;
      case "热门":
        content = (
          <Hot />
        )
        break;
      case "设置":
        content = (
          <Setting fez={fez} navigator={navigator} updateFez={updateFez}/>
        )
        break;
      default: 
        content = <Home navigator={navigator}/>
        head = (
          <HomeHeader
            left={{
              icon: menuOpen ? "arrow-left" : "navicon",
              call: (e)=>{ this._toggle(); }
            }}
            center={{title:''}}
            />
        )
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
    op: state.op,
    fez: state.fez
  }
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: bindActionCreators(openMenu, dispatch),
    selectMenuitem: bindActionCreators(selectMenuitem, dispatch),
    fetchUser: bindActionCreators(fetchUser, dispatch),
    fetchTopics: bindActionCreators(fetchTopics, dispatch),
    updateFez: bindActionCreators(updateFez, dispatch),
    locateFez: bindActionCreators(locateFez, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
