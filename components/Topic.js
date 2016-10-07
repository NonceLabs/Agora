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

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from  'react-native-vector-icons/MaterialIcons'
import EvilIcon from  'react-native-vector-icons/EvilIcons'
import { Header,SwipeHeader } from './widgets/Header'
const {height, width} = Dimensions.get('window')
import s from './widgets/Styles'
import TextModal from './widgets/TextModal'
import { fetchCozes,createCoze,reportCoze } from '../actions/TopicAction'
import { Card } from './widgets/Card'
import _ from 'lodash'

class Topic extends Component {
  constructor(props){
    super(props)
    this.state = {
      cozeModalVisible: false,
      cozeTo: null,
      operating: false,
      reportModal: false
    }
  }
  
  componentWillMount() {
    const { fetchCozes,topicId,fez } = this.props
    fetchCozes(topicId,fez._id)
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
    const { home,navigator,joinable,fez,createCoze,topicId,reportCoze,operations } = this.props
    const { cozeModalVisible,cozeTo,operating,reportModal } = this.state

    const unity = this.richTo(home.cozes)
    return (
      <View>
        <Modal 
          animationType={"slide"}
          transparent={true}
          visible={operating}
          onRequestClose={() => {}}>
          <View style={[{width,height,backgroundColor:'black',opacity:0.3}]}>
            
          </View>
          <View style={[{flexDirection:'column',justifyContent:'flex-end',width,height,backgroundColor:'transparent',position:'absolute',left:0,top:0}]}>
            {operations.filter((t)=>{
              return cozeTo!=null && cozeTo.authorId!=fez._id
            }).map((op,idx)=>{
              return (
                <TouchableOpacity key={idx} onPress={()=>{
                  switch(op.title){
                    case "点赞":
                      break;
                    case "举报":
                      this.setState({reportModal: true});
                      break;
                    default:                        
                      break;
                  }
                  this.setState({operating: false});
                }}>
                  <View style={[s.rowCenter,{width,backgroundColor:'white',marginTop: 6,padding: 10}]}>
                    <EvilIcon name={op.icon} size={30}/>
                    <Text style={[s.h4,s.deepGray]}>{op.title}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </Modal>
        
        {reportModal && (
          <TextModal
            title="举报"
            btnText="发送"
            submit={(content,addons)=>{
              if (_.trim(content).length == 0) {
                return
              }
              reportCoze({
                fezId: fez._id,
                cozeId: cozeTo.cozeId,
                reportContent: content
              })
            }}
            hide={()=> this.setState({reportModal:false})}
            extra={cozeTo}
            addonEnable={false}
            />
        )}
        
        {cozeModalVisible && (
          <TextModal title="回复" btnText="发送" submit={(content,addons)=>{
            const joined = fez.joined.includes(topicId) 
            createCoze(topicId,{
              content,
              addons,
              date: new Date(),
              author:{
                id: fez._id,
                nickname: fez.nickname,
                avatarUrl: fez.avatarUrl
              },
              to: cozeTo!=null ? cozeTo.cozeId : undefined
            },joined, cozeTo)
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
          <Text style={[s.h4,s.bold,s.black,{marginTop:10,textAlign:'left'}]}>
            {unity.length>0 && unity[0].title}
          </Text>
          {unity.map((t,idx)=>{
            const mine = t.author.id == fez._id
            return (
              <Card
                key={idx}
                press={()=>{
                  if (!mine) {
                    this.setState({cozeModalVisible: true,cozeTo:{
                      nickname: t.author.nickname,
                      authorId: t.author.id,
                      content: t.content,
                      cozeId: t._id
                    }});                  
                  }
                }}
                t={t}
                operatable={true}
                mine={mine}
                moreOp={()=> {
                  this.setState({operating: true,cozeTo:{
                    nickname: t.author.nickname,
                    authorId: t.author.id,
                    content: t.content,
                    cozeId: t._id
                  }})
                }}
                />
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

Topic.defaultProps = {
  joinable: true,
  operations: [{
    title: '点赞',
    key: 'like',
    icon: 'like'
  },{
    title: '举报',
    key: 'report',
    icon: 'exclamation'
  },{
    title: '取消',
    key: 'cancel',
    icon: 'close'
  }],
  items: ['like','delete','report'],  
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
    createCoze: bindActionCreators(createCoze, dispatch),
    reportCoze: bindActionCreators(reportCoze, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topic)
