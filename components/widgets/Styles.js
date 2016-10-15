import {
  StyleSheet,
  Dimensions
} from 'react-native'
const {height, width} = Dimensions.get('window')

export default styles = StyleSheet.create({
  columnCenter:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
    backgroundColor: '#008cd5'
  },
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
    paddingTop: 0,
    paddingBottom: 100
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
    shadowRadius: 2,
    shadowColor: '#333',
    shadowOpacity: 0.5,
    shadowOffset: {height: 1,width: 1},
    // padding: 10,
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: width-40
  },
  metaInfo:{
    color: '#999',
    fontSize: 12,
    fontWeight: '200'
  },
  dialogWrapper:{
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogFezWrapper:{
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70
  },
  dialogAvatar:{
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 4
  },
  dialogContentWrapper:{
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#999',
    paddingBottom: 4,
    shadowRadius: 1,
    shadowColor: '#999',
    shadowOpacity: 0.3,
    shadowOffset: {height: 1,width: 1}
  },
  dialogName:{
    fontSize: 12,
    marginBottom: 4
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
    width: 100,
    height: 100,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5
  },
  addonWrapper:{
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginRight: 5
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
    
  },
  white:{
    color: 'white'
  },
  azure:{
    color: 'azure'
  },
  replyToWrapper:{
    flexDirection:'row',
    backgroundColor:'mistyrose',
    padding:4,
    borderRadius:2,
    marginLeft: 4
  },
  replyToContent:{
    color: '#666'
  },
  replyToName:{
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
    marginTop: 12,
    alignSelf: 'center',
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    fontSize: 16,
    paddingTop: 4,
    color: '#333',
    fontWeight: 'normal'
  },
  titleInput:{
    width: width*0.7,
    height: 24,
    borderColor: '#999',
    marginTop: 12,
    alignSelf: 'center',
    fontSize: 16,  
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btnView:{
    backgroundColor: '#008cd5',
    padding: 8,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 4,
    marginTop: 30
  },
  btnToFollowedView:{
    backgroundColor: '#008cd5',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#008cd5'
  },
  btnToFollowedText:{
    color: 'white',
    fontSize: 16
  },
  btnFollowedView:{
    backgroundColor: 'white',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#666'
  },
  btnFollowedText:{
    color: '#666',
    fontSize: 16
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
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    top: 0
  },
  cover:{
    backgroundColor:'#333',
    opacity:0.2
  },
  menuImage:{
    width: width*0.7-2,
    height: width*0.7-2
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
    width: width*0.4,
    height: width*0.4,
    borderRadius: width*0.2 
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
    borderColor: '#999',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  h3:{
    fontSize: 20,
  },
  h4:{
    fontSize: 18
  },
  h5:{
    fontSize: 16
  },
  map:{
    width: width*0.9,
    height:width*1.2,
    borderColor: '#999',
    borderWidth: 3,
    borderRadius: 4
  },
  roundMap:{
    width: width*0.8,
    height:width*0.8,
    borderRadius: width*0.45
  },
  roundMapWrapper:{
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: width*0.8,
    height: width*0.8
  },
  singleLineInput:{
    borderWidth: 1,
    borderColor: '#999',
    width: width*0.5,
    height: 30,
    textAlign: 'center',
    color: '#666'
  },
  changeGender:{
    width:60,
    height:60,
    marginLeft: 10,
    marginRight:10,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  changeAvatar:{
    position: 'absolute',
    top: width*0.2,
    left: width*0.35
  },
  cozeWithTitle:{
    backgroundColor: '#008cd5',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    width: width-20,
    padding: 4,
    marginBottom: 5
  },
  black:{
    color: 'black'
  },
  bold:{
    fontWeight: 'bold'
  },
  badge:{
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    marginLeft: 10
  },
  spinner: {
    marginBottom: 0
  },
  cozePage:{
    backgroundColor: 'black',
    position: 'absolute',
    left: width*0.85,
    top: height*0.85,
    zIndex: 10,
    padding: 10,
    borderRadius: 4
  },
  cozePageText:{
    color: 'white'
  },
  pageWrapper:{
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
    width,
    paddingBottom: 20,
    paddingTop: 10,
    flexWrap: 'wrap'
  },
  pageDot:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 10,
    marginTop: 10
  },
  red:{
    color: 'red'
  }
})