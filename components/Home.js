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
  TextInput,
  MapView
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Icon from  'react-native-vector-icons/MaterialIcons'
import EvilIcon from  'react-native-vector-icons/EvilIcons'
import Ionicon from  'react-native-vector-icons/Ionicons'
import Topic from './Topic'
import s from './widgets/Styles'
const {height, width} = Dimensions.get('window')
import TextModal from './widgets/TextModal'
import axios from 'axios'
import { AVATAR } from '../config/index'
import { createTopic } from '../actions/TopicAction'
class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      textModalVisible: false,
      mapModal: false,
      content: "",
      addons: []
    }
  }

  componentDidMount() {
    
  }
  

  render() {
    const { home,navigator,createTopic,fez } = this.props
    const { content, addons, textModalVisible,mapModal } = this.state
    return (
      <View style={s.root}>
        {textModalVisible && (
          <TextModal title="话题" submit={(content,addons)=>{
            createTopic({
              content,
              addons,
              date: new Date(),
              author: {
                id: fez._id,
                nickname: fez.nickname,
                avatarUrl: fez.avatarUrl
              },
              location: [1,1]
            })
          }} btnText="发布" hide={()=>{ this.setState({textModalVisible:false});}}/>
        )}
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
              <EvilIcon name="close-o" size={50} color="#999"/>
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
                    nav: <Topic navigator={navigator} topic={t}/>,
                  })
                }}
                >
                <View>
                  <View style={s.topicAuthor}>
                    <Image style={s.avatar} source={{uri: t.author.avatarUrl||AVATAR}} />
                    <Text style={s.name}>{t.author.nickname}</Text>
                    <TouchableOpacity style={s.flexEnd}>
                      <Icon name="more-horiz" size={20} color="#999"/>
                    </TouchableOpacity>
                  </View>
                  <View style={s.topicContent}>
                    <Text style={s.content}>{t.content}</Text>
                  </View>
                  <View style={s.topicInfo}>
                    <Text style={s.metaInfo}>{"热度"}</Text>
                    <Text style={s.metaInfo}>{" · "}</Text>
                    <Text style={s.metaInfo}>{t.updated||(new Date()).toLocaleTimeString()}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        <View style={s.floatMenu}>
          <TouchableOpacity onPress={()=> this.setState({mapModal:true})}>
            <View style={[s.floatMenuItem,{}]}>
              <Ionicon name="ios-map-outline" size={20} color="black" />
              <Text style={{marginLeft: 4,fontSize: 14}}>地图</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this.setState({textModalVisible:true})}>
            <View style={[s.floatMenuItem,{borderLeftWidth:1,marginLeft: 5,paddingLeft:10}]}>
              <Text style={{marginRight: 4,fontSize: 14}}>说两句</Text>
              <Ionicon name="ios-add-circle-outline" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    fez: state.fez
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createTopic: bindActionCreators(createTopic, dispatch)
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
          