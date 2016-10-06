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
const {height, width} = Dimensions.get('window')
import s from './widgets/Styles'
import { fetchFezCreated,fetchFezJoined,fetchFezViewed,fetchTopicInArray } from '../actions/TopicAction'
import { Card } from './widgets/Card'
import { Header,SwipeHeader } from './widgets/Header'
import Topic from './Topic'

class History extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: 'created'
    }
  }
  
  componentWillMount() {
    const { fez, home, fetchFezCreated } = this.props
    fetchFezCreated(fez._id)
  }
  
  render() {
    const { tabs,home,fez,fetchFezViewed,fetchFezJoined,navigator,menuOpen,toggle,fetchFezCreated,fetchTopicInArray } = this.props
    const { selected } = this.state
    return (
      <View style={[s.root,{paddingTop: 10}]}>
        <SwipeHeader
          left={{
            icon: menuOpen ? "arrow-left" : "navicon",
            call: ()=>{ toggle() }
          }}
          swiper={tabs}
          selected={selected}
          select={(t)=>{
            this.setState({selected: t.key});
            if (home[t.key].length == 0) {
              switch(t.key){
                case "joined":
                  fetchFezJoined(fez._id)
                  break;
                case "viewed":
                  fetchFezViewed(fez._id)
                  break;
                case "created":
                  fetchFezCreated(fez._id)
                  break;
                default:
                  break;
              } 
            }
          }}
          />
        <ScrollView style={s.topicsContainer} bounces={true} automaticallyAdjustContentInsets={false} scrollEventThrottle={200} contentContainerStyle={s.topicsContentStyle}>
          {home[selected].map((t,idx)=>{            
            return (
              <Card navigator={navigator} key={idx} t={t} press={()=>{
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

History.defaultProps = {
  tabs: [{
    title: '创建',
    key: 'created'
  },{
    title: '参与',
    key: 'joined'
  },{
    title: '浏览',
    key: 'viewed'
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
    fetchTopicInArray: bindActionCreators(fetchTopicInArray, dispatch),
    fetchFezCreated: bindActionCreators(fetchFezCreated, dispatch),
    fetchFezJoined: bindActionCreators(fetchFezJoined, dispatch),
    fetchFezViewed: bindActionCreators(fetchFezViewed, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History)
