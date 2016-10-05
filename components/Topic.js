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
import { Card } from './widgets/Card'

class Topic extends Component {
  constructor(props){
    super(props)
    this.state = {
      cozeModalVisible: false,
      cozeTo: null
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
    const { home,navigator,joinable,fez,createCoze,topicId } = this.props
    const { cozeModalVisible,cozeTo } = this.state

    const unity = this.richTo(home.cozes)
    
    return (
      <View>
        {cozeModalVisible && (
          <TextModal title="回复" btnText="发送" submit={(content,addons)=>{
            const joined = fez.joined.includes(topicId) 
            console.log(fez.joined);
            console.log(topicId);           
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
            },joined)
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
              <Card key={idx} press={()=>{
                this.setState({cozeModalVisible: true,cozeTo:{
                  name: t.author.nickname,
                  coze: t.content,
                  cozeId: t._id
                }});
              }} t={t}/>
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
