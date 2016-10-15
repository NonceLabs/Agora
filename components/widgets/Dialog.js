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
import { AVATAR,SIP } from '../../config/index'
import Icon from  'react-native-vector-icons/MaterialIcons'
import Topic from '../Topic'
import TextModal from './TextModal'

class Dialog extends Component {
  render() {
    const { t, press } = this.props
    const like = t.type=='like'
    let content = null
    if (like) {
      content = (
        <View  style={[s.dialogContentWrapper,{width: width-100}]}>
          <TouchableOpacity onPress={()=> press()}>
            <View style={{backgroundColor: '#008cd5',width: width-102,marginBottom: 4}}>
              <Text style={[s.h6,s.white,{padding: 4}]}>{t.title}</Text>
            </View>
          </TouchableOpacity>
          <Text style={s.replyToName}>{t.to.author.nickname+" : "}</Text>
          <Text style={[s.content,{marginLeft: 4}]}>{t.to.content}</Text>
        </View>
      )
    }else{
      content = (
        <View  style={[s.dialogContentWrapper,{width: width-120}]}>
          <TouchableOpacity onPress={()=> press()}>
            <View style={{backgroundColor: '#008cd5',width: width-122,marginBottom: 4}}>
              <Text style={[s.h6,s.white,{padding: 4}]}>{t.title}</Text>
            </View>
          </TouchableOpacity>
          {(t.to!=undefined && typeof(t.to)=="object") && (
            <View style={[s.replyToWrapper]}>
              <Text style={s.replyToName}>
                {t.to.author.nickname+" : "}
                <Text style={s.replyToContent}>{t.to.content}</Text>
              </Text>
            </View>
          )}
          <Text style={[s.content,{marginLeft: 4}]}>{t.content}</Text>
        </View>
      )
    }

    return (
      <View style={s.dialogWrapper}>
        <View style={s.dialogFezWrapper}>
          <Image style={s.dialogAvatar} source={{uri: t.author.avatarUrl||AVATAR}} />
          <Text style={s.dialogName}>{t.author.nickname}</Text>
          {like ? (
            <EvilIcon name="like" size={20} color="red"/>
          ):(
            <EvilIcon name="comment" size={20} color="#333"/>
          )}
        </View>
        {content}
      </View>
    );
  }
}

export default Dialog;