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
import EvilIcon from  'react-native-vector-icons/EvilIcons'
import Ionicon from  'react-native-vector-icons/Ionicons'
import Topic from './Topic'
import s from './widgets/Styles'
const {height, width} = Dimensions.get('window')

class Menu extends Component {
  render() {
    const { menus } = this.props
    return (
      <View style={[s.root,{
        zIndex:10,
        shadowRadius: 1,
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowOffset: {height: 1,width: 1},}]}>
        <View>
          <Image source={require('../assets/menu_bg.jpg')} style={s.menuImage}/>
          <Image source={require('../assets/avatar.png')} style={s.avatarInMenu}/>
        </View>
        <View style={s.menuWrapper}>
          {menus.map((t,idx)=>{
            return (
              <View key={idx} style={s.menuItemWrapper}>
                <EvilIcon name={t.icon} size={30} color="darkslateblue"/>
                <Text style={s.menuItemText}>{t.title}</Text>
              </View>
            )
          })}
        </View>
      </View>
    );
  }
}

Menu.defaultProps = {
  menus:[{
    icon: 'bell',
    title: '消息'
  },{
    icon: 'star',
    title: '话题'
  },{
    icon: 'tag',
    title: '标签'
  },{
    icon: 'eye',
    title: '历史'
  },{
    icon: 'user',
    title: '个人资料'
  },{
    icon: 'gear',
    title: '设置'
  },{
    icon: 'sc-telegram',
    title: '反馈'
  }]
}

export default Menu;