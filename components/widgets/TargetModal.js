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
  TextInput,
  Platform,
  Easing
} from 'react-native';

const {height, width} = Dimensions.get('window')
import s from './Styles'
import Ionicon from  'react-native-vector-icons/Ionicons'
import _ from 'lodash'
import Mapbox,{ MapView } from 'react-native-mapbox-gl';
Mapbox.setAccessToken('pk.eyJ1IjoiY2hlemhlMTQzIiwiYSI6ImNpdHV4ZnU3dDAwMGIzb3A2ZDY4dXB1cHcifQ.lNI7a0-kJ8u_AXE4yIJVXg');

class TargetModal extends Component {
  constructor(props){
    super(props)

    this.state = {
      side: new Animated.Value(1),
      mapVisible: false
    }  
  }
  componentDidMount() {
    const { side } = this.state
    const timing = Animated.timing;
    // Animated.timing(this.state.side, {
    //   toValue: 100,
    //   easing: Easing.linear,
    //   friction: 12,
    //   duration: 1000
    // }).start();
    // Animated.sequence([ // One after the other
    //   timing(side, {
    //     toValue: height*1.5,
    //     easing: Easing.linear,
    //     duration: 1000
    //   }),
    //   Animated.delay(400), // Use with sequence
    //   timing(side, {
    //     toValue: width*0.8,
    //     easing: Easing.elastic(0), // Springy
    //     duration: 1000
    //   }),
    //   Animated.delay(400)      
    // ]).start();

    Animated.spring(side, {
      toValue: 0,   // Returns to the start
      velocity: 1,  // Velocity makes it move
      tension: -10, // Slow
      friction: 1,  // Oscillate a lot
      duration: 2000
    }).start();

    setTimeout(()=>{
      this.setState({mapVisible: true});
    }, 3000);
  }
  
  render() {
    const { location,retarget,gotopics } = this.props
    const { side,mapVisible } = this.state
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={true}
        onRequestClose={() => {}}>
        <View style={s.columnCenter}>
          <Animated.View style={[s.roundMapWrapper,{
              transform: [   // Array order matters
                {scale: side.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 4],
                })},
                {translateX: side.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 800],
                })},
                {rotate: side.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    '0deg', '180deg' // 'deg' or 'rad'
                  ],
                })},
              ]
            }]}>
            {mapVisible && (
              <MapView 
                style={[s.roundMap]}
                initialCenterCoordinate={location}
                initialZoomLevel={14}
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
                />
            )}
          </Animated.View>
          <View style={s.rowCenter}>            
            <TouchableOpacity onPress={()=>{
              gotopics()
            }}>
              <View style={[s.btnView,{borderColor:'white',borderWidth:1}]}>
                <Text style={s.btnText}>{"开始探索"}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
export default TargetModal;

// <TouchableOpacity onPress={()=>{
//               retarget()
//             }}>
//               <View style={[s.btnView,{borderColor:'white',borderWidth:1,marginRight: 10}]}>
//                 <Text style={s.btnText}>{"重新定位"}</Text>
//               </View>
//             </TouchableOpacity>

