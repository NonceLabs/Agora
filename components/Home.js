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
const {height, width} = Dimensions.get('window');

class Home extends Component {
  render() {
    const { home } = this.props
    console.log(home);
    return (
      <View style={styles.homeWrapper}>
        <ScrollView style={styles.topicsContainer} bounces={true} automaticallyAdjustContentInsets={false} scrollEventThrottle={200} contentContainerStyle={styles.topicsContentStyle}>
          {home.topics.map((t,idx)=>{
            return (
              <View key={idx} style={styles.topicWrapper}>
                <View style={styles.topicAuthor}>
                  <Image style={styles.avatar} source={t.author.avatarUrl} />
                  <Text style={styles.name}>{t.author.nickname}</Text>
                </View>
                <View style={styles.topicContent}>
                  <Text style={styles.content}>{t.content}</Text>
                </View>
                <View style={styles.topicInfo}>
                  <Text style={styles.metaInfo}>{"热度"+t.heat}</Text>
                  <Text style={styles.metaInfo}>{" · "}</Text>
                  <Text style={styles.metaInfo}>{t.updated}</Text>
                </View>
              </View>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeWrapper:{
    flexDirection: 'column'
  },
  topicsContainer:{
    backgroundColor: 'azure',
    height: height-110,
    width: width,
    position: 'absolute',
    left: 0,
    paddingTop: 0
  },
  topicsContentStyle:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  topicWrapper:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: width,
    borderBottomWidth: 1,
    borderColor: '#999',
    backgroundColor: 'white',
    shadowRadius: 1,
    shadowColor: '#333',
    shadowOpacity: 0.5,
    shadowOffset: {height: 1,width: 1},
    padding: 10,
    paddingBottom: 5,
    marginTop: 8
  },
  topicAuthor:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5
  },
  topicContent:{
    paddingBottom: 5
  },
  topicInfo:{
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  metaInfo:{
    color: '#999',
    fontSize: 12,
    fontWeight: '200'
  },
  avatar:{
    width: 20,
    height: 20,
    borderRadius: 10
  },
  name:{
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '400'
  },
  content:{
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '300'
  }
})

function mapStateToProps(state) {
  return {
    home: state.home 
  }
}

function mapDispatchToProps(dispatch) {
  return {
 
 }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)