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

class Topic extends Component {
  render() {
    const { cozes,navigator,joinable } = this.props
    return (
      <View>
        <Header />
        <ScrollView style={styles.topicsContainer} bounces={true} automaticallyAdjustContentInsets={false} scrollEventThrottle={200} contentContainerStyle={styles.topicsContentStyle}>
          {cozes.map((t,idx)=>{
            return (
              <TouchableOpacity
                key={idx} style={styles.topicWrapper}
                onPress={(e) => {
                  
                }}
                >
                <View>
                  <View style={styles.topicAuthor}>
                    <Image style={styles.avatar} source={require('../assets/avatar.png')} />
                    <Text style={styles.name}>{t.author.nickname}</Text>
                    <Text style={styles.metaInfo}>{t.coze.date}</Text>
                  </View>
                  {t.to!=undefined && (
                    <View style={styles.toTopicContent}>
                      <Text style={styles.toAuthor}>
                        {t.to.author.nickname+" : "}
                        <Text style={styles.toContent}>{t.to.coze.content}</Text>
                      </Text>                      
                    </View>
                  )}
                  <View style={styles.topicContent}>
                    <Text style={styles.content}>{t.coze.content}</Text>
                  </View>
                  {t.coze.addons!=undefined && t.coze.addons.map((addon,index)=>{
                    return (
                      <TouchableOpacity
                        key={idx} style={styles.addonWrapper}
                        onPress={(e) => {
                          
                        }}
                        >
                        <Image style={styles.addon} source={{uri: addon}} />
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </TouchableOpacity>
            )
          })}
          {joinable && (
            <TouchableOpacity>
              <View style={styles.joinWrapper}>
                <Icon name="add" size={55} color="white"/>
              </View>
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

const styles = StyleSheet.create({
  homeWrapper:{
    flexDirection: 'column'
  },
  topicsContainer:{
    backgroundColor: 'azure',
    height: height-60,
    width: width,
    position: 'absolute',
    left: 0,
    paddingTop: 0
  },
  topicsContentStyle:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  topicWrapper:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: width-20,
    borderBottomWidth: 1,
    borderColor: '#999',
    backgroundColor: 'white',
    shadowRadius: 1,
    shadowColor: '#333',
    shadowOpacity: 0.5,
    shadowOffset: {height: 1,width: 1},
    padding: 10,
    paddingBottom: 5,
    marginTop: 8
  },
  topicAuthor:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    width: width-40
  },
  topicContent:{
    paddingBottom: 5,
    paddingTop: 4
  },
  toTopicContent:{
    backgroundColor: '#999',
    padding: 4,
    borderRadius: 4
  },
  toAuthor:{
    
  },
  toContent:{
    color: '#333'
  },
  topicInfo:{
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  metaInfo:{
    color: '#999',
    fontSize: 12,
    fontWeight: '200',
    position: 'absolute',
    right: 10
  },
  avatar:{
    width: 20,
    height: 20,
    borderRadius: 10
  },
  name:{
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '400'
  },
  content:{
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '300'
  },
  addon:{
    width: width*0.2,
    height: width*0.2,
    borderWidth: 1,
    borderColor: '#999'
  },
  addonWrapper:{
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  joinWrapper:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width*0.05,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'darkslateblue'
  }
})

export default Topic;