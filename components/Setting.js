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
import s from './widgets/Styles'

class Setting extends Component {
  render() {
    const { list } = this.props
    return (
      <View style={s.root}>
        {list.map((t,idx)=>{
          return (
            <View key={idx} style={s.setList}>
              <Text style={[s.h4,s.deepGray]}>{t.title}</Text>
            </View>
          )
        })}        
      </View>
    );
  }
}

Setting.defaultProps = {
  list: [{
    title: '通知',
  },{
    title: '关于'
  },{
    title: '退出'
  }]
}

export default Setting;