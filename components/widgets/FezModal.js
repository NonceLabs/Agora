import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform
} from 'react-native';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EvilIcon from  'react-native-vector-icons/EvilIcons'
const {height, width} = Dimensions.get('window')
import s from './Styles'
import Ionicon from  'react-native-vector-icons/Ionicons'
import ImagePicker from 'react-native-image-picker'
import { IMAGER_OPTION,SIP } from '../../config/index'
import { RNUploader } from 'NativeModules'

const opts = {
    url: `${SIP}avatar`,
    method: 'POST',  // optional: POST or PUT
    headers: { 'Accept': 'application/json' },
};


class FezModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      fez: props.fez
    }
  }
  
  updateAvatar(){
    if (this.props.fez.avatarUrl != this.state.fez.avatarUrl) {
      const files = [this.state.fez.avatarUrl].map((t)=>{
        return {
          name: 'files[]',
          filepath: t
        }
      })

      const nopts = Object.assign({},opts,{
        files
      })
      RNUploader.upload( nopts, (err, response) => {
        if( err ){
            console.log(err);
            return;
        }

        const status = response.status
        const naddons = JSON.parse(response.data)
        if (status == 200) {
          this.props.submit(this.state.fez)
          this.props.hide()
        }
      });
    }else{
      this.props.submit(this.state.fez)
      this.props.hide()
    }
  }

  render() {
    const { hide,btnText,submit } = this.props
    const { fez } = this.state
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={true}
        onRequestClose={() => {}}
        >
        <View style={s.topicModal}>
          <TouchableOpacity style={{flexDirection:'column',alignItems:'flex-end',width:width*0.95}} onPress={()=>{
            hide()
          }}>
            <EvilIcon name="close-o" size={50} color="#999"/>
          </TouchableOpacity>
          <View style={{alignItems:'center'}}>
            <Image source={{uri:fez.avatarUrl}} style={s.fezAvatar}/>
            <TouchableOpacity style={s.changeAvatar} onPress={()=> this.addImage()}>
              <Ionicon name="ios-camera" size={50} color="#008cd5" style={{
                backgroundColor: 'transparent'
              }}/>
            </TouchableOpacity>
            <View style={{flexDirection:'row',paddingTop: 20}}>
              <TextInput style={s.singleLineInput} onChangeText={(value)=>{
                this.setState({fez: Object.assign({},fez,{
                  nickname: value
                })});
              }} value={fez.nickname} />
            </View>
            <View style={{flexDirection:'row',paddingTop: 20,alignItems:'center'}}>
              {[0,1,2].map((t)=>{
                const sd = fez.gender==t ? {
                  borderColor: '#666'
                } : {borderColor: 'white'}
                return (
                  <TouchableOpacity key={t} onPress={()=>{
                    this.setState({fez: Object.assign({},fez,{
                      gender: t
                    })});
                  }}  style={[s.changeGender,sd]}>
                    <View>
                      {this.getGender(t)}
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>

          <TouchableOpacity onPress={()=>{
            this.updateAvatar()
          }}>
            <View style={s.btnView}>
              <Text style={s.btnText}>{btnText}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
  getGender(gender){
    const size = 40
    switch(gender){
      case 1:
        return <Ionicon name="ios-man" size={size} color="blue"/>
      case 2:
        return <Ionicon name="ios-woman" size={size} color="red"/>
      default:
        return <Ionicon name="ios-help-circle" size={size} color="#999"/>
    }
  }
  addImage(){
    ImagePicker.showImagePicker(IMAGER_OPTION, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = null
        if (Platform.OS === 'ios') {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          source = {uri: response.uri, isStatic: true};
        }
        
        this.setState({
          fez: Object.assign({},this.state.fez,{
            avatarUrl: source.uri
          })
        });
      }
    });
  }
}

export default FezModal