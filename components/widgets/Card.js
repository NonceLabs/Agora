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
import TextModal from './TextModal'

export class Card extends Component {
  constructor(props){
    super(props)
    this.state = {
      reportModal: false
    }
  }
  
  render() {
    const { t,edge,press,operations,operatable,mine,moreOp } = this.props
    const { reportModal } = this.state
    const edgeStyle = edge? {width: width-20,borderRadius: 4}:{}
    const withTitleStyle = t.showTitle!=undefined ? {}:{paddingTop:10}
    
    return (
      <View style={[s.topicWrapper, edgeStyle,withTitleStyle]}>
        {t.showTitle && (
          <View style={s.cozeWithTitle}>
            <Text style={[s.h6,{color:'white'}]}>{t.topicTitle}</Text>
          </View>
        )}
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
                  moreOp()
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
  operatable: false,
  mine: false,
  moreOp:()=>{}
}

// ,{
//     title: '删除',
//     key: 'delete',
//     icon: 'trash'
//   }