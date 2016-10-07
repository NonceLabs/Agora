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

class SignupModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      nfez:{
        nickname: "",
        gender: 0       
      }
    }
  }
  render() {
    const { nfez } = this.state
    const { signupFez } = this.props
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={true}
        onRequestClose={() => {}}>
        <View style={s.columnCenter}>
          <View style={{borderBottomWidth: 2,borderColor:'white',width:width*0.7,alignSelf:'center'}}>
            <TextInput
              multiline={false}
              maxLength={20}
              placeholder="名字"
              style={[s.titleInput,{color:'white',fontSize:20,paddingBottom: 4}]}
              onChangeText={(nickname) => {
                this.setState({nfez: Object.assign({},nfez,{
                  nickname
                })})
              }}
              value={nfez.nickname}
              />
            </View>
          <View style={{flexDirection:'row',paddingTop: 20,alignItems:'center'}}>
            {[0,1,2].map((t)=>{
              const sd = nfez.gender==t ? {
                borderColor: 'white'
              } : {borderColor: '#666'}
              return (
                <TouchableOpacity key={t} onPress={()=>{
                  this.setState({nfez: Object.assign({},nfez,{
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
          <TouchableOpacity onPress={()=>{
            if (_.trim(nfez.nickname).length != 0) {
              signupFez(nfez)
            }
          }}>
            <View style={[s.btnView,{borderColor:'white',borderWidth:1}]}>
              <Text style={s.btnText}>{"开始"}</Text>
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
        return <Ionicon name="ios-help-circle" size={size} color="#333"/>
    }
  }  
}

SignupModal.defaultProps = {
  signupFez: ()=>{

  }
}

export default SignupModal;