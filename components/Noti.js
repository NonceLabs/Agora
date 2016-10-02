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
const {height, width} = Dimensions.get('window')
import s from './widgets/Styles'

class Noti extends Component {
  render() {
    const { comments } = this.props
    return (
      <View style={s.root}>
        <ScrollView style={[s.topicsContainer,{height: height-60}]} bounces={true} automaticallyAdjustContentInsets={false} scrollEventThrottle={200} contentContainerStyle={s.topicsContentStyle}>
          {comments.map((t,idx)=>{
            return (
              <TouchableOpacity
                key={idx} style={[s.topicWrapper,{width:width-20,borderRadius: 5}]}
                onPress={(e) => {
                  
                }}
                >
                <View>
                  <View style={[s.topicAuthor,{width: width-40}]}>
                    <Image style={s.avatar} source={require('../assets/avatar.png')} />
                    <Text style={s.name}>{t.author.nickname}</Text>
                    <Text style={[s.flexEnd,{marginRight:30}]}>{t.coze.date}</Text>
                  </View>
                  {t.to!=undefined && (
                    <View style={s.toTopicContent}>
                      <Text style={s.toAuthor}>
                        {t.to.author.nickname+" : "}
                        <Text style={s.toContent}>{t.to.coze.content}</Text>
                      </Text>                      
                    </View>
                  )}
                  <View style={s.topicContent}>
                    <Text style={s.content}>{t.coze.content}</Text>
                  </View>
                  {t.coze.addons!=undefined && t.coze.addons.map((addon,index)=>{
                    return (
                      <TouchableOpacity
                        key={idx} style={s.addonWrapper}
                        onPress={(e) => {
                          
                        }}
                        >
                        <Image style={s.addon} source={{uri: addon}} />
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>        
      </View>
    );
  }
}

Noti.defaultProps = {
  comments:[{
    author: {
      nickname: '刘德华',
      avatarUrl: require('../assets/avatar.png'),
      id: ''
    },
    to:{
      id: 'a2',
      toid: '',
      author: {
        id: '',
        nickname: '万青'
      },
      coze: {
        type: 'text',
        content: '那东西我们早就不屑啦',
        date: (new Date()).toLocaleTimeString()
      }
    },
    coze: {
      content: '去你的',
      addons: [],
      date: (new Date()).toLocaleTimeString()
    }
  },{
    author: {
      nickname: '古天乐',
      avatarUrl: require('../assets/avatar.png'),
      id: ''
    },
    to:{
      id: 'a2',
      toid: '',
      author: {
        id: '',
        nickname: '万青'
      },
      coze: {
        type: 'text',
        content: '那东西我们早就不屑啦',
        date: (new Date()).toLocaleTimeString()
      }
    },
    coze: {
      content: '我什么都说',
      addons: [],
      date: (new Date()).toLocaleTimeString()
    }
  }]
}

export default Noti;