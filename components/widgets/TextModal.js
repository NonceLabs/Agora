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

import EvilIcon from 'react-native-vector-icons/EvilIcons';
const {height, width} = Dimensions.get('window')
import s from './Styles'
import ImagePicker from 'react-native-image-picker'
import { IMAGER_OPTION } from '../../config/index'

class TextModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      addons: [],
      value: ""
    }
  }
  render() {
    const { title,btnText,submit,hide,extra } = this.props
    const { addons,value } = this.state

    return (
      <View>
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
            <View style={{width: width*0.9}}>
              <Text style={[s.h1,s.gray]}>{title}</Text>
              <Text style={[s.h6,s.gray,{marginTop: 10}]}>
                {extra!=null && (
                  <Text style={[s.deepGray]}>{extra.name+" : "}</Text>
                )}
                {extra!=null && extra.coze}
              </Text>            
            </View>
            <TextInput
              multiline={true}
              style={s.newTopicInput}
              onChangeText={(value) => this.setState({value})}
              value={value}
            />
            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',width:width*0.9}}>
              {addons.map((t,idx)=>{
                console.log(t);
                return (
                  <TouchableOpacity
                    key={idx} style={s.addonWrapper}
                    onPress={(e) => {
                      
                    }}
                    >
                    <Image source={t} style={s.addon} />
                  </TouchableOpacity>
                )
              })}
              {addons.length<3 && (
                <TouchableOpacity style={{marginLeft:20,marginTop:18,alignSelf:'flex-start'}} onPress={()=>{
                  this.addImage()
                }}>
                  <EvilIcon name="camera" size={50} color={"gray"}/>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={()=>{
              submit(value, addons)
              hide()
            }}>
              <View style={s.btnView}>
                <Text style={s.btnText}>{btnText}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
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
        // You can display the image using either data...
        // const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        let source = null
        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          source = {uri: response.uri, isStatic: true};
        }

        const addons = this.state.addons.concat([source])
        this.setState({
          addons: addons
        });
      }
    });

  }
}

export default TextModal;