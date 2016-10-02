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
  TextInput
} from 'react-native';

import EvilIcon from 'react-native-vector-icons/EvilIcons';
const {height, width} = Dimensions.get('window')
import s from './Styles'

class TextModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      addons: [],
      value: ""
    }
  }
  render() {
    const { title,btnText,submit,hide } = this.props
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
            <Text style={[s.h1,s.gray]}>{title}</Text>
            <TextInput
              multiline={true}
              style={s.newTopicInput}
              onChangeText={(value) => this.setState({value})}
              value={value}
            />
            <View style={{flexDirection:'column',width:width}}>
              {addons.map((t,idx)=>{

              })}
              {addons.length<=3 && (
                  <TouchableOpacity style={{marginLeft:20,marginTop:6,alignSelf:'flex-start'}}>
                  <EvilIcon name="camera" size={50} color={"gray"}/>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={()=>{
              submit()
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
}

export default TextModal;