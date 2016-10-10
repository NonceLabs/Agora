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
  DeviceEventEmitter
} from 'react-native';
import { RNUploader } from 'NativeModules'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
const {height, width} = Dimensions.get('window')
import s from './Styles'
import ImagePicker from 'react-native-image-picker'
import { IMAGER_OPTION,SIP } from '../../config/index'
import _ from 'lodash'

const opts = {
    url: `${SIP}upload`,
    method: 'POST',  // optional: POST or PUT
    headers: { 'Accept': 'application/json' },
};

class TextModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      addons: [],
      value: "",
      titleValue: ""
    }
  }
  componentDidMount() {
    DeviceEventEmitter.addListener('RNUploaderProgress', (data)=>{
      let bytesWritten = data.totalBytesWritten;
      let bytesTotal   = data.totalBytesExpectedToWrite;
      let progress     = data.progress;

      console.log( "upload progress: " + progress + "%");
    });
  }
  
  render() {
    const { title,btnText,submit,hide,extra,titleInput,addonEnable } = this.props
    const { addons,value,titleValue } = this.state

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
              {titleInput && (
                <View style={{borderBottomWidth: 2,borderColor:'#999',width:width*0.7,alignSelf:'center'}}>
                  <TextInput
                    multiline={false}
                    maxLength={20}
                    placeholder="标题"
                    style={s.titleInput}
                    onChangeText={(titleValue) => this.setState({titleValue})}
                    value={titleValue}
                    />
                </View>                
              )}
              <Text style={[s.h6,s.gray,{marginTop: 10}]}>
                {extra!=null && (
                  <Text style={[s.deepGray]}>{extra.nickname+" : "}</Text>
                )}
                {extra!=null && extra.content}
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
              {addonEnable && addons.length<3 && (
                <TouchableOpacity style={{marginLeft:20,marginTop:18,alignSelf:'flex-start'}} onPress={()=>{
                  this.addImage()
                }}>
                  <EvilIcon name="camera" size={50} color={"gray"}/>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={()=>{                
              if (_.trim(value).length!=0 || addons.length>0) {
                if (addonEnable && addons.length>0) {
                  this.uploadAddons()
                }else{
                  submit(value, addons, titleValue)
                }                                
              }
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
  uploadAddons(){
    const { value, addons, titleValue } = this.state
    
    const files = addons.map((t)=>{
      return {
        name: 'files[]',
        filepath: t.uri
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
        this.props.submit(value, naddons, titleValue)        
      }
    });
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
        console.log(response);
        let source = null
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

TextModal.defaultProps = {
  titleInput: false,
  addonEnable: true
}