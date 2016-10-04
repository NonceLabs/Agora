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
import TextModal from './widgets/TextModal'
import { Card } from './widgets/Card'
import { createTopic } from '../actions/TopicAction'
import Mapbox,{ MapView } from 'react-native-mapbox-gl';
Mapbox.setAccessToken('pk.eyJ1IjoiY2hlemhlMTQzIiwiYSI6ImNpdHV4ZnU3dDAwMGIzb3A2ZDY4dXB1cHcifQ.lNI7a0-kJ8u_AXE4yIJVXg');

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
    this.annotations = [{
      coordinates:[37.332,-122.03],
      type: 'point',
      title: '标记',
      subtitle: '久未放晴的天空',
      rightCalloutAccessory: {
        source: { uri: 'https://cldup.com/9Lp0EaBw5s.png' },
        height: 25,
        width: 25
      },
      annotationImage: {
        source: { uri: 'https://cldup.com/CnRLZem9k9.png' },
        height: 25,
        width: 25
      },
      id: 'marker1'
    }]
  }
  

  render() {
    const { home,navigator,createTopic,fez } = this.props
    const { content, addons, textModalVisible,mapModal } = this.state

    const location = fez.location
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
              location: [location.longitude,location.latitude]
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
            <View style={s.rowCenter}>
              <MapView 
                style={s.map}
                initialCenterCoordinate={location}
                initialZoomLevel={16}
                initialDirection={0}
                rotateEnabled={false}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                annotationsPopUpEnabled={true}
                showsUserLocation={true}
                userTrackingMode={Mapbox.userTrackingMode.follow}
                userLocationVerticalAlignment={Mapbox.userLocationVerticalAlignment.center}
                styleURL={Mapbox.mapStyles.light}
                logoIsHidden={true}
                compassIsHidden={true}
                annotations={this.annotations}
                onRightAnnotationTapped={()=>{
                  
                }}
                />
            </View>            
          </View>
        </Modal> 
        <ScrollView style={s.topicsContainer} bounces={true} automaticallyAdjustContentInsets={false} scrollEventThrottle={200} contentContainerStyle={s.topicsContentStyle}>
          {home.topics.map((t,idx)=>{            
            return (
              <Card edge={false} key={idx} t={t} press={()=>{
                navigator.push({
                  id: 'nav',
                  nav: <Topic navigator={navigator} topicId={t._id}/>,
                })
              }}/>
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
          