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
  render() {
    const { t,edge,press } = this.props
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
              <TouchableOpacity style={s.flexEnd}>
                <Icon name="more-horiz" size={20} color="#999"/>
              </TouchableOpacity>
            </View>
            <View style={s.topicContent}>
              <Text style={s.content}>{t.content}</Text>
            </View>
            <View style={s.topicInfo}>
              <Text style={s.metaInfo}>{"热度"}</Text>
              <Text style={s.metaInfo}>{" · "}</Text>
              <Text style={s.metaInfo}>{t.updated||(new Date()).toLocaleTimeString()}</Text>
            </View>
          </View>
      </TouchableOpacity>
          
        </View>
    );
  }
}

Card.defaultProps = {
  edge: true
}