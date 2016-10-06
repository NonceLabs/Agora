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

class Notice extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: "replyToMe"
    }
  }
  
  componentWillMount() {
    this.props.readNotice()
  }
  
  render() {
    const { comments, menuOpen, toggle, tabs, navigator, fez } = this.props
    const { selected } = this.state
    console.log(fez.replyToMe);
    return (
      <View style={s.root}>
        <SwipeHeader
          left={{
            icon: menuOpen ? "arrow-left" : "navicon",
            call: ()=>{ toggle() }
          }}
          swiper={tabs}
          selected={selected}
          select={(t)=>{
            this.setState({selected: t.key});            
          }}
          />
        <ScrollView style={[s.topicsContainer,{height: height-60}]} bounces={true} automaticallyAdjustContentInsets={false} scrollEventThrottle={200} contentContainerStyle={s.topicsContentStyle}>
          {fez[selected].map((t,idx)=>{            
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

Notice.defaultProps = {
  tabs: [{
    title: '@我',
    key: 'replyToMe'
  },{
    title: '更新',
    key: 'replyToAll'
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
    readNotice: bindActionCreators(readNotice, dispatch) 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notice)
