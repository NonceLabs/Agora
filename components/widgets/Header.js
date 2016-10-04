import {
  Text,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
  Alert,
  TextInput
} from 'react-native';
import React,{Component,PropTypes} from 'react'

import EvilIcon from 'react-native-vector-icons/EvilIcons';
const {height, width} = Dimensions.get('window')
import Spinner from 'react-native-spinkit'
import s from './Styles'
export class Header extends Component {
  render(){
    const { left,center,right } = this.props
    const btns = [left,center,right]
    const ss = [styles.left,styles.center,styles.right]

    return (
      <View style={styles.header}>
        {btns.map((t,idx)=>{
          const not_null = (t != undefined && t!=null)
          return (
            <View style={[ss[idx],(not_null && t.style!=undefined) ? t.style : {}]} key={idx}>
              {not_null && (
                <TouchableOpacity
                  onPress={(e) => {
                    t.call();
                  }}
                  >
                  <View style={styles.back}>
                    {(t.icon!=undefined && t.icon!='') && (<EvilIcon
                      name={t.icon}
                      size={42}
                      color="black"
                      />)}
                    {(t.title!=undefined && t.title!='')&&(<Text style={styles.title}>{t.title}</Text>)}
                  </View>
                </TouchableOpacity>)}
            </View>
          )
        })}
      </View>
    );
  }
}

export class HomeHeader extends Component {
  render(){
    const { left } = this.props
    return (
      <View style={[styles.header]}>
        <View style={[styles.left]}>
          <TouchableOpacity
            onPress={(e) => {
              left.call(e);
            }}
            >
            <View style={styles.back}>
              <EvilIcon
                name={left.icon}
                size={42}
                color="black"
                />
            </View>
          </TouchableOpacity>
        </View>
        <Image source={require('../../assets/logo.png')} style={{
          width: 40,height: 32,marginTop: 10
        }}/>
        <Text style={[s.deepGray,s.h4,{marginTop:12,fontWeight:'800',marginLeft: 8}]}>TUK</Text>
      </View>
    )
  }
}

export class SearchHeader extends Component {
  render(){
    const { navigator,keyword,editSearchKeyword,parent } = this.props
    return (
      <View style={styles.searchHeader}>
        <TextInput value={keyword} onChangeText={(text)=>{
          if (text.length == 0) {
            parent.setState({searching: false});
          }
          editSearchKeyword(text)
        }} autoFocus={false} style={styles.searcher} onEndEditing={()=>{
          parent.setState({searching: true});
        }}/>
        <TouchableOpacity style={styles.cancelSearchTouch} onPress={()=>{
          navigator.pop()
        }}>
          <Text style={styles.cancelSearch}>{"取消"}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export class SwipeHeader extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }
  render(){
    const { swiper,selectCategory,selectedIndex } = this.props
    const selectedStyle = {borderBottomWidth:4,borderColor:'white',paddingBottom:2}
    return (
      <View style={[styles.header,{justifyContent:'center',alignItems:'flex-end'}]}>
        {swiper.map((t,idx)=>{
          return (
            <TouchableOpacity key={idx} onPress={()=>{
              selectCategory(idx)
            }}>
              <View style={[styles.swiperTextWrapper,idx==selectedIndex && selectedStyle]}>
                <Text style={styles.swiperText}>{t}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
}

Header.contextTypes = {
  navigator: React.PropTypes.object
}

const styles = StyleSheet.create({
  swiperTextWrapper:{
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5
  },
  swiperText:{
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  searchHeader:{
    height: 60,
    backgroundColor: '#333333',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  cancelSearchTouch:{
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  cancelSearch:{
    color:'white',
    fontSize: 20    
  },
  searcher:{
    width: width*0.8,
    borderRadius: 3,
    height: 30,
    paddingLeft: 4,
    marginLeft: 5,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 5,
    alignSelf: 'flex-start'
  },
  header:{
    height: 60,
    width: width,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#999'
  },
  title:{
    color: 'white',
    fontSize: 17,
  },
  left:{
    width: width/8,
    marginTop: 18,
    justifyContent: 'flex-end',
  },
  center:{
    width: width*3/4,
    alignItems: 'center',
    marginTop: 18,
  },
  right:{
    width: width/8,
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  back:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  container:{
    flexDirection: 'column'
  },
  backTxt:{
    color: 'white',
    fontSize: 15,
    left: -5,
    marginTop: 7,
    alignSelf: 'center'
  },
  operateForward:{
    marginRight: 10,
  },
  spinner: {
    marginBottom: 50
  }
})
