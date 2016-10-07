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
import { createTopic,viewTopic } from '../actions/TopicAction'
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
    
  }
  

  render() {
    const { home,navigator,createTopic,fez,viewTopic } = this.props
    const { content, addons, textModalVisible,mapModal } = this.state

    const location = fez.location
    
    this.annotations = home.topics.map((t)=>{
      return {
        coordinates: [t.location[1],t.location[0]],
        type: 'point',
        title: '标记',
        subtitle: '久未放晴的天空',
        rightCalloutAccessory: {
          source: { uri: 'http://192.168.1.100:3000/images/view.png' },
          height: 50,
          width: 50
        },
        annotationImage: {
          source: { uri: 'http://192.168.1.100:3000/images/topic.png' },
          height: 50,
          width: 50
        },
        id: t._id
      }
    })
    
    return (
      <View style={s.root}>
        {textModalVisible && (
          <TextModal title="话题" submit={(content,addons,title)=>{
            createTopic({
              content,
              addons,
              title,
              date: new Date(),
              author: {
                id: fez._id,
                nickname: fez.nickname,
                avatarUrl: fez.avatarUrl
              },
              location: [location.longitude,location.latitude]
            })
          }} btnText="发布" titleInput={true} hide={()=>{ this.setState({textModalVisible:false});}}/>
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
                initialZoomLevel={14}
                initialDirection={0}
                rotateEnabled={false}
                scrollEnabled={false}
                zoomEnabled={false}
                pitchEnabled={false}
                annotationsPopUpEnabled={true}
                showsUserLocation={false}
                userTrackingMode={Mapbox.userTrackingMode.follow}
                userLocationVerticalAlignment={Mapbox.userLocationVerticalAlignment.center}
                styleURL={Mapbox.mapStyles.light}
                logoIsHidden={true}
                compassIsHidden={true}
                annotations={this.annotations}
                onRightAnnotationTapped={()=>{
                  
                }}
                onRightAnnotationTapped={(anno)=>{
                  this.setState({mapModal: false});
                  if (!fez.viewed.includes(anno.id)) {
                    viewTopic(anno.id)
                  }
                  navigator.push({
                    id: 'nav',
                    nav: <Topic navigator={navigator} topicId={anno.id}/>,
                  })
                }}
                />
            </View>
          </View>
        </Modal> 
        <ScrollView style={s.topicsContainer} bounces={true} automaticallyAdjustContentInsets={false} scrollEventThrottle={200} contentContainerStyle={s.topicsContentStyle}>
          {home.topics.map((t,idx)=>{            
            return (
              <Card
                edge={false}
                key={idx}
                t={t}
                press={()=>{
                  if (!fez.viewed.includes(t._id)) {
                    viewTopic(t._id,fez._id)
                  }
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
    createTopic: bindActionCreators(createTopic, dispatch),
    viewTopic: bindActionCreators(viewTopic, dispatch)
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
          