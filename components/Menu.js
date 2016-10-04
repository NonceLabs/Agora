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
    const { menus,closeMenu,selectMenuitem } = this.props
    return (
      <View style={[s.root,{
        zIndex:10,
        width: width*0.7-2,
        borderRightWidth: 1,
        shadowRadius: 1,
        shadowColor: '#333',
        shadowOpacity: 0.5,
        shadowOffset: {height: 1,width: 1},}]}>
        <View>
          <Image source={require('../assets/menu_bg.jpg')} style={s.menuImage}/>
          <TouchableOpacity style={s.avatarInMenu} onPress={()=>{
            closeMenu()
            selectMenuitem("我")
          }}>
            <Image source={require('../assets/avatar.png')} style={s.avatarInMenu}/>
          </TouchableOpacity>
        </View>
        <View style={s.menuWrapper}>
          {menus.map((t,idx)=>{
            const sep = t.title=="历史" && {borderBottomWidth:1,borderColor:'#999'}
            return (
              <TouchableOpacity key={idx} onPress={()=>{
                closeMenu()
                selectMenuitem(t.title)
              }}>
                <View style={[s.menuItemWrapper,sep]}>
                  <EvilIcon name={t.icon} size={30} color="darkslateblue"/>
                  <Text style={s.menuItemText}>{t.title}</Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    );
  }
}

Menu.defaultProps = {
  menus:[{
    icon: 'location',
    title: '首页'
  },{
    icon: 'bell',
    title: '消息'
  },{
    icon: 'tag',
    title: '热门'
  },{
    icon: 'clock',
    title: '历史'
  },{
    icon: 'gear',
    title: '设置'
  },{
    icon: 'sc-telegram',
    title: '反馈'
  }]
}

export default Menu;