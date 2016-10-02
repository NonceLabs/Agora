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

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Ionicon from  'react-native-vector-icons/Ionicons'
const {height, width} = Dimensions.get('window')
import s from './widgets/Styles'

class Fez extends Component {
  render() {
    const { user } = this.props
    return (
      <View style={[s.root,{alignItems:'center'}]}>
        <Image source={user.avatarUrl} style={s.fezAvatar}/>
        <View style={{flexDirection:'row',paddingTop: 20}}>
          <Text style={s.fezName}>{user.nickname}</Text>
          {this.getGender(user.gender)}          
        </View>

        <View style={{flexDirection:'row',paddingTop: 20,alignItems:'center'}}>
          <Text style={[s.fezName,{fontSize: 16,marginRight: 5}]}>{user.province}</Text>
          <Text style={[s.fezName,{fontSize: 16,marginRight: 5,marginLeft:5}]}>{user.city}</Text>
          <Text style={[s.fezName,{fontSize: 16,marginRight:0}]}>{", "+user.country}</Text>
        </View>
      </View>
    );
  }
  getGender(gender){
    const size = 20
    switch(gender){
      case 1:
        return <Ionicon name="ios-man" size={size} color="blue"/>
      case 2:
        return <Ionicon name="ios-woman" size={size} color="red"/>
      default:
        return <Ionicon name="ios-help-circle" size={size} color="#999"/>
    }
  }
}


function mapStateToProps(state) {
  return {
    user: state.user 
  }
}

function mapDispatchToProps(dispatch) {
  return {
 
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fez)