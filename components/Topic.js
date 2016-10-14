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
import { fetchCozes,createCoze,reportCoze,likeCoze } from '../actions/TopicAction'
import { followTopic } from '../actions/FezAction'
import { Card } from './widgets/Card'
import _ from 'lodash'
import Spinner from 'react-native-spinkit';
import PageModal from './widgets/PageModal'

class Topic extends Component {
  constructor(props){
    super(props)
    this.state = {
      cozeModalVisible: false,
      cozeTo: null,
      operating: false,
      reportModal: false,
      paging: false
    }
  }
  
  componentWillMount() {
    const { fetchCozes,topicId,fez } = this.props
    fetchCozes(topicId, 1)
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
    const { home,navigator,joinable,fez,createCoze,topicId,reportCoze,operations,followTopic,likeCoze } = this.props
    const { cozeModalVisible,cozeTo,operating,reportModal,paging } = this.state

    const unity = this.richTo(home.cozes)
    const followed = fez.followed.includes(topicId)
    return (
      <View>
        <Modal 
          animationType={"slide"}
          transparent={true}
          visible={operating}
          onRequestClose={() => {}}>
          <View style={[{width,height},s.cover]}></View>
          <View style={[{flexDirection:'column',justifyContent:'flex-end',width,height,backgroundColor:'transparent',position:'absolute',left:0,top:0}]}>
            {operations.filter((t)=>{
              return cozeTo!=null && cozeTo.authorId!=fez._id
            }).map((op,idx)=>{
              let opCall = ()=>{}, opTitle=op.title
              
              switch(op.title){
                case "点赞":
                  {
                    if (cozeTo.likes && cozeTo.likes.includes(fez._id)) {
                      opTitle = "取消点赞"
                    }
                    opCall = ()=>{
                      likeCoze({
                        id: cozeTo.cozeId,
                        content: cozeTo.content,
                        topicId,
                        isTopic: cozeTo.isTopic
                      }, {
                        id: fez._id,
                        nickname: fez.nickname
                      },opTitle=="点赞", {
                        id: cozeTo.authorId
                      })
                    }
                  }
                  break;
                case "举报":
                  {
                    opCall = ()=>{
                      this.setState({reportModal: true});
                    }
                  }
                  break;
                default:                        
                  break;
              }
              return (
                <TouchableOpacity key={idx} onPress={()=>{
                  opCall()
                  this.setState({operating: false});
                }}>
                  <View style={[s.rowCenter,{width,backgroundColor:'white',marginTop: 6,padding: 10}]}>
                    <EvilIcon name={op.icon} size={30}/>
                    <Text style={[s.h4,s.deepGray]}>{opTitle}</Text>
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
            const followed = fez.followed.includes(topicId) 
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
            },followed, cozeTo)
          }} hide={()=> this.setState({cozeModalVisible:false})} extra={cozeTo}/>
        )}
        {paging && (
          <PageModal
            total={home.cozePage.total}
            current={home.cozePage.current}
            pageTo={(page)=>{
              if (page != home.cozePage.current) {
                this.props.fetchCozes(topicId, page)                
              }
              this.setState({paging: false});
            }}
            />
        )}
        {home.cozePage.total>1 && (
          <TouchableOpacity style={s.cozePage} onPress={()=>{
              this.setState({paging: true});
            }}>
            <View>
                <Text style={[s.cozePageText,s.h4]}>
                  {home.cozePage.current+"/"+home.cozePage.total}
                </Text>
            </View>
          </TouchableOpacity>
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
          <View style={{flexDirection:'column',width,padding: 10}}>
            <Text style={[s.h4,s.bold,s.black,{marginTop:10,alignSelf:'flex-start'}]}>
            {unity.length>0 && unity[0].title}
            </Text>
            {home.cozePage.current==1 && (<TouchableOpacity style={[followed?s.btnFollowedView : s.btnToFollowedView,{alignSelf:'flex-end'}]} onPress={()=>{
              followTopic(fez._id, topicId, !followed)
            }}>
              <View>
                <Text style={followed?s.btnFollowedText: s.btnToFollowedText}>{followed?"已关注":"关  注"}</Text>
              </View>
            </TouchableOpacity>)}
          </View>
          {unity.length==0 && (
            <Spinner style={s.spinner} isVisible={true} size={80} type={'ChasingDots'} color={'#008cd5'}/>
          )}
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
                index={(home.cozePage.current-1)*12+idx+1}
                type={'coze'}
                operatable={true}
                mine={mine}
                moreOp={()=> {
                  this.setState({operating: true,cozeTo:{
                    isTopic: t.title!=undefined,
                    nickname: t.author.nickname,
                    authorId: t.author.id,
                    content: t.content,
                    cozeId: t._id,
                    likes: t.likes
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
    reportCoze: bindActionCreators(reportCoze, dispatch),
    followTopic: bindActionCreators(followTopic, dispatch),
    likeCoze: bindActionCreators(likeCoze, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Topic)
