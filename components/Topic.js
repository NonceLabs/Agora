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
import EvilIcon from  'react-native-vector-icons/EvilIcons'
import { Header,SwipeHeader } from './widgets/Header'
const {height, width} = Dimensions.get('window')
import s from './widgets/Styles'

class Topic extends Component {
  render() {
    const { cozes,navigator,joinable } = this.props
    return (
      <View>
        <Header />
        <ScrollView style={[s.topicsContainer,{height: height-60}]} bounces={true} automaticallyAdjustContentInsets={false} scrollEventThrottle={200} contentContainerStyle={s.topicsContentStyle}>
          {cozes.map((t,idx)=>{
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
          {joinable && (
            <TouchableOpacity style={{marginTop: 20}}>
              <EvilIcon name="plus" size={72} color="#333"/>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
}

Topic.defaultProps = {
  joinable: true,
  cozes:[{
      id: 'a1',
      author: {
        id: '',
        nickname: '曹东'
      },
      coze: {
        type: 'text',
        content: '哎呀呀，你看你手上拿的是什么啊',
        date: (new Date()).toLocaleTimeString()
      }
    },{
      id: 'a2',
      author: {
        id: '',
        nickname: '万青'
      },
      coze: {
        type: 'text',
        content: '那东西我们早就不屑啦',
        date: (new Date()).toLocaleTimeString()
      }
    },{
      id: 'a3',
      to: {
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
      author: {
        id: '',
        nickname: '惘闻'
      },
      coze: {
        type: 'text',
        content: '我们在原野上找一面墙,我们在标签里找方向，我们在废墟般的垃圾里找一块红砖，我们在工整的巷子里找家',
        date: (new Date()).toLocaleTimeString()
      }
    },{
      id: 'a4',
      author: {
        id: '',
        nickname: '新裤子'
      },
      coze: {
        type: 'text',
        content: '我们在标签里找方向\n我们在废墟中的垃圾里找一块红砖\n我们在工整的巷子里找家',
        addons:['http://vimg.mangocity.com/vimg/trip/big_188320_1398048439653.jpg'],
        date: (new Date()).toLocaleTimeString()
      }
    }]
}

export default Topic;