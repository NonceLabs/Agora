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
  Platform
} from 'react-native';

const {height, width} = Dimensions.get('window')
import s from './Styles'
import Ionicon from  'react-native-vector-icons/Ionicons'
import _ from 'lodash'
import Mapbox,{ MapView } from 'react-native-mapbox-gl';
Mapbox.setAccessToken('pk.eyJ1IjoiY2hlemhlMTQzIiwiYSI6ImNpdHV4ZnU3dDAwMGIzb3A2ZDY4dXB1cHcifQ.lNI7a0-kJ8u_AXE4yIJVXg');

class TargetModal extends Component {
  render() {
    const { location,retarget,gotopics } = this.props
    
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={true}
        onRequestClose={() => {}}>
        <View style={s.columnCenter}>
          <View style={s.roundMapWrapper}>
            <MapView 
              style={s.roundMap}
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
          </View>
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