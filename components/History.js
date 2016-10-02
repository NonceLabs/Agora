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
const {height, width} = Dimensions.get('window')
import s from './widgets/Styles'

class History extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: '参与'
    }
  }
  render() {
    const { tabs } = this.props
    const { selected } = this.state
    return (
      <View style={s.root}>
        <View style={s.rowCenter}>
          {tabs.map((t,idx)=>{
            const sd = selected==t.title ? {borderBottomWidth: 3,borderColor: '#666'} : {}
            return (
              <View key={idx} style={[sd,{paddingBottom: 4,marginLeft: 6,marginRight: 6}]}>
                <TouchableOpacity onPress={()=> this.setState({selected:t.title})}>
                  <Text style={[s.h2,s.deepGray]}>
                    {t.title}
                  </Text>
                </TouchableOpacity>
              </View>              
            )
          })}
        </View>
      </View>
    );
  }
}

History.defaultProps = {
  tabs: [{
    title: '参与'
  },{
    title: '浏览'
  }]
}

export default History;