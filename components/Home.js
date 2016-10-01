import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
  Alert,
  ScrollView,
  TextInput
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from  'react-native-vector-icons/MaterialIcons'
import EvilIcon from  'react-native-vector-icons/EvilIcons'
import Ionicon from  'react-native-vector-icons/Ionicons'
import Topic from './Topic'
import s from './widgets/Styles'
const {height, width} = Dimensions.get('window')

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTopicModal: false,
      mapModal: false,
      content: "",
      addons: []
    }
  }
  render() {
    const { home,navigator } = this.props
    const { content, addons, newTopicModal,mapModal } = this.state
    return (
      <View style={s.root}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={newTopicModal}
          onRequestClose={() => {}}
          >
          <View style={s.topicModal}>
            <TouchableOpacity style={{flexDirection:'column',alignItems:'flex-end',width:width*0.95}} onPress={()=>{
              this.setState({newTopicModal: false});
            }}>
              <EvilIcon name="close" size={50} color="#999"/>
            </TouchableOpacity>
            <TextInput
              multiline={true}
              style={s.newTopicInput}
              onChangeText={(content) => this.setState({content})}
              value={content}
            />
            <View style={{flexDirection:'column',width:width}}>
              {addons.map((t,idx)=>{

              })}
              {addons.length<=3 && (<TouchableOpacity style={{marginLeft:20,marginTop:6,alignSelf:'flex-start'}}>
                <EvilIcon name="image" size={50} color={"gray"}/>
              </TouchableOpacity>)}
            </View>
            
            <View style={s.btnView}>
              <Text style={s.btnText}>发布</Text>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={mapModal}
          onRequestClose={() => {}}
          >
          <View style={s.topicModal}>
            <TouchableOpacity style={{flexDirection:'column',alignItems:'flex-end',width:width*0.95}} onPress={()=>{
              this.setState({mapModal: false});
            }}>
              <EvilIcon name="close" size={50} color="#999"/>
            </TouchableOpacity>
            <View style={{flexDirection:'column',width:width}}>
              
            </View>            
          </View>
        </Modal> 
        <ScrollView style={s.topicsContainer} bounces={true} automaticallyAdjustContentInsets={false} scrollEventThrottle={200} contentContainerStyle={s.topicsContentStyle}>
          {home.topics.map((t,idx)=>{
            return (
              <TouchableOpacity
                key={idx} style={s.topicWrapper}
                onPress={(e) => {
                  navigator.push({
                    id: 'nav',
                    nav: <Topic navigator={navigator}/>,
                  })
                }}
                >
                <View>
                  <View style={s.topicAuthor}>
                    <Image style={s.avatar} source={t.author.avatarUrl} />
                    <Text style={s.name}>{t.author.nickname}</Text>
                    <TouchableOpacity style={s.flexEnd}>
                      <Icon name="more-horiz" size={20} />
                    </TouchableOpacity>
                  </View>
                  <View style={s.topicContent}>
                    <Text style={s.content}>{t.content}</Text>
                  </View>
                  <View style={s.topicInfo}>
                    <Text style={s.metaInfo}>{"热度"+t.heat}</Text>
                    <Text style={s.metaInfo}>{" · "}</Text>
                    <Text style={s.metaInfo}>{t.updated}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        <View style={s.floatMenu}>
          <TouchableOpacity onPress={()=> this.setState({mapModal:true})}>
            <View style={[s.floatMenuItem,{}]}>
              <Ionicon name="ios-map-outline" size={30} color="black" />
              <Text style={{marginLeft: 4}}>地图</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.setState({newTopicModal:true})}>
            <View style={[s.floatMenuItem,{borderLeftWidth:1,marginLeft: 5,paddingLeft:10}]}>
              <Text style={{marginRight: 4}}>说两句</Text>
              <Ionicon name="ios-add-circle-outline" size={30} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home 
  }
}

function mapDispatchToProps(dispatch) {
  return {
 
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)


// <TouchableOpacity>
//             <View style={s.floatMenuItem}>
//               <Ionicon name="options-outline" size={30} color="black" />
//               <Text>筛选</Text>
//             </View>
//           </TouchableOpacity>
          