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

class Noti extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: "tome"
    }
  }
  render() {
    const { comments, menuOpen, toggle, tabs, navigator, home } = this.props
    const { selected } = this.state
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

Noti.defaultProps = {
  tabs: [{
    title: '@我',
    key: 'tome'
  },{
    title: '更新',
    key: 'tojoined'
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
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Noti)
