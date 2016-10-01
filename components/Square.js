import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import Icon from  'react-native-vector-icons/MaterialIcons'
import { Header,SwipeHeader } from './widgets/Header'
const {height, width} = Dimensions.get('window')
import s from './widgets/Styles'
import Swiper from 'react-native-swiper';

class Square extends Component {
  render() {
    return (
      <View style={s.root}>
        <Swiper index={0} width={width} height={200} style={s.swiperWrapper} autoplay={true} showsPagination={true} dot={(
          <View style={{backgroundColor:'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3}} />
        )} activeDot={(
          <View style={{backgroundColor: '#007aff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3}} />
        )}>
          {['red','white','blue'].map((t,idx)=>{
            return (
              <View key={idx} style={{backgroundColor:t,width,height:200}}>
              </View>
            )
          })}
        </Swiper>
      </View>
    );
  }
}

export default Square;