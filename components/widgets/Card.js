import React, {Component} from 'react';
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

import EvilIcon from 'react-native-vector-icons/EvilIcons';
const {height, width} = Dimensions.get('window')
import Spinner from 'react-native-spinkit'
import s from './Styles'
import { AVATAR } from '../../config/index'
import Icon from  'react-native-vector-icons/MaterialIcons'
import Topic from '../Topic'

export class Card extends Component {
  constructor(props){
    super(props)
    this.state = {
      operating: false
    }
  }
  
  componentWillMount() {
    
  }
  
  render() {
    const { t,edge,press,operations,operatable,mine } = this.props
    const { operating } = this.state
    const edgeStyle = edge? {width: width-20,borderRadius: 4}:{}
    const withTitleStyle = t.showTitle!=undefined ? {}:{paddingTop:10}
    
    return (
      <View style={[s.topicWrapper, edgeStyle,withTitleStyle]}>
        {t.showTitle && (
          <View style={s.cozeWithTitle}>
            <Text style={[s.h6,{color:'white'}]}>{t.topicTitle}</Text>
          </View>
        )}
        <Modal 
          animationType={"slide"}
          transparent={true}
          visible={operating}
          onRequestClose={() => {}}>
          <View style={[{width,height,backgroundColor:'black',opacity:0.3}]}>
            
          </View>
          <View style={[{flexDirection:'column',justifyContent:'flex-end',width,height,backgroundColor:'transparent',position:'absolute',left:0,top:0}]}>
            {operations.filter((t)=>{
              return !mine
            }).map((op,idx)=>{
              return (
                <TouchableOpacity key={idx} onPress={()=>{
                  switch(op.title){
                    case "点赞":
                      break;
                    default:                        
                      break;
                  }
                  this.setState({operating: false});
                }}>
                  <View style={[s.rowCenter,{width,backgroundColor:'white',marginTop: 6,padding: 10}]}>
                    <EvilIcon name={op.icon} size={30}/>
                    <Text style={[s.h4,s.deepGray]}>{op.title}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </Modal>
        <TouchableOpacity        
          onPress={(e) => {
            press()
          }}
          >          
          <View style={{paddingLeft: 10,paddingRight:10}}>
            <View style={[s.topicAuthor, edge && {width: width-40}]}>
              <Image style={s.avatar} source={{uri: t.author.avatarUrl||AVATAR}} />
              <Text style={s.name}>{t.author.nickname}</Text>
              {operatable && !mine && (
                <TouchableOpacity style={s.flexEnd} onPress={()=>{
                this.setState({operating: true});
              }}>
                  <Icon name="more-horiz" size={20} color="#999"/>
                </TouchableOpacity>
              )}
            </View>
            <View style={s.topicContent}>
              {!edge && (
                <Text style={[s.h5,s.black,s.bold]}>{t.title}</Text>
              )}
              {(t.to!=undefined && typeof(t.to)=="object") && (
                <View style={s.replyToWrapper}>
                  <Text style={s.azure}>{t.to.author.nickname+" : "}</Text>
                  <Text style={s.white}>{t.to.content}</Text>
                </View>
              )}
              <Text style={s.content}>{t.content}</Text>
            </View>
            <View style={s.topicInfo}>
              <Text style={s.metaInfo}>{"热度"}</Text>
              <Text style={s.metaInfo}>{" · "}</Text>
              <Text style={s.metaInfo}>{(new Date(t.date)).toLocaleString()}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

Card.defaultProps = {
  edge: true,
  operations: [{
    title: '点赞',
    key: 'like',
    icon: 'like'
  },{
    title: '举报',
    key: 'report',
    icon: 'exclamation'
  },{
    title: '取消',
    key: 'cancel',
    icon: 'close'
  }],
  items: ['like','delete','report'],
  operatable: false,
  mine: false
}

// ,{
//     title: '删除',
//     key: 'delete',
//     icon: 'trash'
//   }