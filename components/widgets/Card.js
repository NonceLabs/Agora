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

export class Card extends Component {
  constructor(props){
    super(props)
    this.state = {
      reportModal: false,
      viewUri: "",
      viewSize:{
        width: 100,
        height: 100
      }
    }
  }
  
  render() {
    const { t,edge,press,operations,operatable,mine,moreOp,index } = this.props
    const { reportModal,viewUri,size } = this.state
    const edgeStyle = edge? {width: width-20,borderRadius: 4}:{}
    const withTitleStyle = t.showTitle!=undefined ? {}:{paddingTop:10}
    let imageModal = null
    if (viewUri!="") {
      imageModal = (
        <Modal
          animationType={"slide"}
          transparent={true}
          >
          <View style={[s.columnCenter,s.cover]}>
            
          </View>
          <View style={[s.columnCenter,s.mask]}>
            <Image source={{uri: viewUri}} style={size} />
            <TouchableOpacity style={{marginTop: 30}} onPress={()=>{
              this.setState({viewUri:""});
            }}>
              <EvilIcon name="close-o" size={80} color="white"/>
            </TouchableOpacity>
          </View>          
        </Modal>
      )
    }

    return (
      <View style={[s.topicWrapper, edgeStyle,withTitleStyle]}>
        {t.showTitle && (
          <View style={s.cozeWithTitle}>
            <Text style={[s.h6,{color:'white'}]}>{t.topicTitle}</Text>
          </View>
        )}
        {imageModal}
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
            <View style={s.addonWrapper}>
              {t.addons.map((addon,tidx)=>{
                const uri = `${SIP}addons/${addon}`
                return (
                  <TouchableOpacity key={tidx} onPress={()=>{
                    if (edge) {
                      this.setState({viewUri:uri});
                      Image.getSize(uri,(iwidth,iheight)=>{
                        this.setState({size:{
                          width: width*0.9,
                          height: (iheight*width*0.9)/(iwidth)
                        }});
                      }) 
                    }else{
                      press()
                    }
                  }}>
                  <Image source={{uri}} style={s.addon}/>
                  </TouchableOpacity>
                )
              })}
            </View>
            <View style={s.topicInfo}>
              <Text style={s.metaInfo}>{(new Date(t.date)).toLocaleString()}</Text>
              {index>0 && (
                <Text style={[s.metaInfo,{alignSelf:'flex-end',color:'black'}]}>{"  F"+index}</Text>
              )}
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
  index: -1,
  moreOp:()=>{}
}

// ,{
//     title: '删除',
//     key: 'delete',
//     icon: 'trash'
//   }