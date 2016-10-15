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
const { height, width } = Dimensions.get('window')
import s from './widgets/Styles'
import { Header,SwipeHeader } from './widgets/Header'
import { Card } from './widgets/Card'
import Topic from './Topic'
import { readNotice } from '../actions/FezAction'
import { createCoze } from '../actions/TopicAction'
import TextModal from './widgets/TextModal'
import Dialog from './widgets/Dialog'

class Notice extends Component {
  constructor(props){
    super(props)
    this.state = {
      cozeTo: null,
      operating: false
    }
  }
  
  componentWillMount() {
    const { fez,readNotice } = this.props
    readNotice(fez.notices.map((t)=> t._id))
  }
  
  render() {
    const { comments, menuOpen, toggle, tabs, navigator, fez, createCoze } = this.props
    const { operating, cozeTo } = this.state
    
    return (
      <View style={s.root}>
        {operating && (
          <TextModal 
            title="回复" 
            btnText="发送" 
            submit={(content,addons)=>{
              createCoze(cozeTo.topicId,{
                content,
                addons,
                date: new Date(),
                author:{
                  id: fez._id,
                  nickname: fez.nickname,
                  avatarUrl: fez.avatarUrl
                },
                to: cozeTo.cozeId
              },true, cozeTo)
              this.setState({operating: true});
            }} 
            hide={()=> this.setState({operating:false})} 
            extra={cozeTo}/>
        )}
        <ScrollView style={[s.topicsContainer,{height: height-60}]} bounces={true} automaticallyAdjustContentInsets={false} scrollEventThrottle={200} contentContainerStyle={s.topicsContentStyle}>
          {fez.notices.map((t,idx)=>{            
            return (
              <Dialog
                navigator={navigator}
                key={idx}
                t={t}
                mine={false}
                moreOp={()=>{
                  this.setState({cozeTo: {
                    nickname: t.author.nickname,
                    authorId: t.author.id,
                    content: t.content,
                    cozeId: t.cozeId,
                    topicId: t.topicId
                  }, operating: true});
                }}
                press={()=>{
                  const tid = t.topicId || t._id
                  navigator.push({
                    id: 'nav',
                    nav: <Topic navigator={navigator} topicId={tid}/>,
                  })
                }}/>
            )
          })}
        </ScrollView>        
      </View>
    );
  }
}

Notice.defaultProps = {
  tabs: [{
    title: '@我',
    key: 'replyToMe'
  }]
}

function mapStateToProps(state) {
  return {
    home: state.home,
    fez: state.fez
  }
}

function mapDispatchToProps(dispatch) {
  return {
    readNotice: bindActionCreators(readNotice, dispatch),
    createCoze: bindActionCreators(createCoze, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notice)

// <SwipeHeader
//           left={{
//             icon: menuOpen ? "arrow-left" : "navicon",
//             call: ()=>{ toggle() }
//           }}
//           swiper={tabs}
//           selected={selected}
//           select={(t)=>{
//             this.setState({selected: t.key});            
//           }}
//           />
        