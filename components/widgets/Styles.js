import {
  StyleSheet,
  Dimensions
} from 'react-native'
const {height, width} = Dimensions.get('window')

export default styles = StyleSheet.create({
  root:{
    flexDirection: 'column',
    width: width,
    height: height,
    backgroundColor: 'white'
  },
  topicsContainer:{
    backgroundColor: 'white',
    height: height-60,
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
    paddingBottom: 5,
    width: width-20
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
  },
  addon:{
    width: width*0.2,
    height: width*0.2,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: 'steelblue'
  },
  addonWrapper:{
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  joinWrapper:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width*0.05,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'darkslateblue'
  },
  toTopicContent:{
    backgroundColor: 'skyblue',
    padding: 4,
    borderRadius: 4
  },
  toAuthor:{
    
  },
  toContent:{
    color: '#333'
  },
  flexEnd:{
    position: 'absolute',
    right: 0
  },
  topicModal:{
    flexDirection: 'column',
    width: width,
    height: height*0.8,
    paddingTop: height*0.1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  newTopicInput:{
    width: width*0.9,
    height: width*0.5,
    borderColor: '#999',
    marginTop: 20,
    alignSelf: 'center',
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontSize: 16,
    paddingTop: 4,
    color: '#333',
    fontWeight: 'bold'
  },
  btnView:{
    backgroundColor: '#008cd5',
    padding: 8,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 4,
    marginTop: 30
  },
  btnText:{
    color: 'white',
    fontSize: 16
  },
  floatMenu:{
    zIndex: 10,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 90,
    padding: 10,
    paddingTop: 8,
    paddingBottom: 8,
    width: width*0.5,
    left: width*0.25,
    borderRadius: 30,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowRadius: 1,
    shadowColor: '#999',
    shadowOpacity: 0.3,
    shadowOffset: {height: 1,width: 1},    
  },
  floatMenuItem:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight:5,
    borderColor: '#999'
  },
  sperator:{
    fontSize: 60,
    color: '#999',
    fontWeight: '100',
    marginLeft: 10,
    marginRight: 10
  },
  mask:{
    width: width,
    height: height,
    opacity: 1,
    backgroundColor: 'black',
    position: 'absolute',
    left: 0,
    top: 0
  },
  menuImage:{
    width: width*0.6,
    height: width*0.6
  },
  menuWrapper:{
    flexDirection:'column',
    paddingTop: 6
  },
  menuItemWrapper:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 6,
    paddingTop: 6,
    paddingLeft: 12
  },
  menuItemText:{
    fontSize: 16,
    fontWeight: '300',
    marginLeft: 18
  },
  avatarInMenu:{
    position: 'absolute',
    top: width*0.1,
    left: width*0.05,
    width: width*0.3,
    height: width*0.3 
  },
  flipCardContainer: {
    width: width,
    height: height,
    backgroundColor: 'white'
  },
  flipCard: {
    width: width*0.6,
    height: height
  },
  fezAvatar:{
    width: width*0.3,
    height: width*0.3,
    borderRadius: width*0.15,
    padding: 4,
    borderWidth: 4,
    borderColor: 'darkslateblue'
  },
  fezName:{
    fontSize: 18,
    fontWeight: '800',
    color: '#666',
    marginRight: 20    
  },
  h1:{
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '700'
  },
  gray:{
    color: '#999'
  },
  h2:{
    fontSize: 22,
    textAlign: 'center',
    fontWeight: '700'
  },
  deepGray:{
    color: '#666'
  },
  rowCenter:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  columnStart:{
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  setList:{
    width: width-20,
    marginLeft: 10,
    paddingTop: 18,
    paddingBottom: 18,
    borderBottomWidth: 1,
    borderColor: '#999'
  },
  h3:{
    fontSize: 20,
  },
  h4:{
    fontSize: 18
  },
  h5:{
    fontSize: 16
  }
})