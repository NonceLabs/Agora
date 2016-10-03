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
import Icon from  'react-native-vector-icons/MaterialIcons'
import EvilIcon from  'react-native-vector-icons/EvilIcons'
import { Header,SwipeHeader } from './widgets/Header'
const {height, width} = Dimensions.get('window')
import s from './widgets/Styles'
import TextModal from './widgets/TextModal'
import { fetchCozes,createCoze } from '../actions/TopicAction'

class Topic extends Component {
  constructor(props){
    super(props)
    this.state = {
      cozeModalVisible: false,
      cozeTo: null
    }
  }
  
  componentWillMount() {
    const { fetchCozes,topic,fez } = this.props
    fetchCozes(topic._id,fez._id)
  }
  
  richTo(cozes){
    return cozes.map((t)=>{
      if (t.to != undefined) {
        return Object.assign({},t,{
          to: cozes.filter((it)=> it._id==t.to)[0]
        })
      }
      return t
    })
  }

  render() {
    const { home,navigator,joinable,fez,createCoze,topic } = this.props
    const { cozeModalVisible,cozeTo } = this.state

    const unity = [topic].concat(this.richTo(home.cozes))
    console.log(unity);
    return (
      <View>
        {cozeModalVisible && (
          <TextModal title="回复" btnText="发送" submit={(content,addons)=>{
            createCoze(topic._id,{
              content,
              addons,
              date: new Date(),
              author:{
                id: fez._id,
                nickname: fez.nickname,
                avatarUrl: fez.avatarUrl
              },
              to: cozeTo!=null ? cozeTo.cozeId : undefined
            })
          }} hide={()=> this.setState({cozeModalVisible:false})} extra={cozeTo}/>
        )}
        <Header
         left={{
          icon: 'arrow-left',
          title: '',
          call: ()=>{
            navigator.pop()
          }
         }}
         right={{
           icon: 'plus',
           call: ()=>{
             this.setState({cozeModalVisible:true,cozeTo:null})
           }
         }}
         />
        <ScrollView style={[s.topicsContainer,{height: height-60}]} bounces={true} automaticallyAdjustContentInsets={false} scrollEventThrottle={200} contentContainerStyle={s.topicsContentStyle}>
          {unity.map((t,idx)=>{
            return (
              <TouchableOpacity
                key={idx} style={[s.topicWrapper,{width:width-20,borderRadius: 5}]}
                onPress={(e) => {
                  this.setState({cozeModalVisible: true,cozeTo:{
                    name: t.author.nickname,
                    coze: t.content,
                    cozeId: t._id
                  }});
                }}
                >
                <View>
                  <View style={[s.topicAuthor,{width: width-40}]}>
                    <Image style={s.avatar} source={require('../assets/avatar.png')} />
                    <Text style={s.name}>{t.author.nickname}</Text>
                    <Text style={[s.flexEnd,{marginRight:30}]}>{typeof(t.date)=="string"?(new Date(t.date)).toLocaleString():t.date.toLocaleString()}</Text>
                  </View>
                  {t.to!=undefined && (
                    <View style={s.toTopicContent}>
                      <Text style={s.toAuthor}>
                        {t.to.author.nickname+" : "}
                        <Text style={s.toContent}>{t.to.content}</Text>
                      </Text>                      
                    </View>
                  )}
                  <View style={s.topicContent}>
                    <Text style={s.content}>{t.content}</Text>
                  </View>
                  {t.addons!=undefined && t.addons.map((addon,index)=>{
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

Topic.defaultProps = {
  joinable: true
}

function mapStateToProps(state) {
  return {
    home: state.home,
    fez: state.fez
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCozes: bindActionCreators(fetchCozes, dispatch),
    createCoze: bindActionCreators(createCoze, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topic)
