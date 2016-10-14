import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal
} from 'react-native';
const {height, width} = Dimensions.get('window')
import s from './Styles'
import _ from 'lodash'
import EvilIcon from 'react-native-vector-icons/EvilIcons'

class PageModal extends Component {
  render() {
    const { total, current, pageTo } = this.props
    return (
      <Modal
        animationType={"slide"}
        transparent={true}>
        <View style={[s.columnCenter,s.cover]}>
            
        </View>
        <View style={[s.columnCenter,s.mask,{justifyContent:'flex-end',alignItems:'flex-end'}]}>
          <View style={s.pageWrapper}>
            <TouchableOpacity style={{flexDirection:'column',alignItems:'flex-end',width:width*0.95}} onPress={()=>{
                pageTo(current)
              }}>
              <EvilIcon name="close" size={50} color="#999"/>
            </TouchableOpacity>
          
            {_.range(1, total+1).map((t,idx)=>{
              const selected = t==current?{backgroundColor:'#008cd5'}:{}
              return (
                <TouchableOpacity key={t} onPress={()=>{
                  pageTo(t)
                }}>
                  <View style={[selected,s.pageDot]}>
                    <Text style={[s.h2, t==current?s.white:s.deepGray]}>{t}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}          
          </View>
        </View>
      </Modal>
    );
  }
}

export default PageModal;