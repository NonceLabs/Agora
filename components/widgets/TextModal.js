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
import Qiniu,{Auth,ImgOps,Conf,Rs,Rpc} from 'react-native-qiniu';


class TextModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      addons: [],
      value: "",
      titleValue: ""
    }
  }
  render() {
    const { title,btnText,submit,hide,extra,titleInput } = this.props
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
              submit(value, addons, titleValue)
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
        let source = null
        if (Platform.OS === 'ios') {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          source = {uri: response.uri, isStatic: true};
        }
        Conf.ACCESS_KEY = 'PK87R6EAMpnIpTaukjNI51jJO013a5Y8mLNam8xq'
        Conf.SECRET_KEY = '8dEFoCBC2wPXuWDe_jMCgU1p_zEDpKGRlUodu5Kw'
        var putPolicy = new Auth.PutPolicy2(
            {scope: "agora:kkk.jpg"}
        );
        var uptoken = putPolicy.token();
        let formInput = {
            key : "kkk.jpg",
        }
        
        Rpc.uploadFile(source.uri, uptoken, formInput)
          .then((response) => console.log(response))
          .catch((error) => {
            console.log(error);
          });

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
  titleInput: false
}