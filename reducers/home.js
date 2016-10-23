import {
  FETCH_TOPICS,
  NEW_COZE,
  FETCH_COZES,
  FETCH_FEZ_CREATED,
  FETCH_FEZ_FOLLOWED,
  OTHEZ,
  NEW_TOPIC,
  TOPIC_NEXT_PAGE,
  LOADING_NEXT_PAGE,
  COZE_NEXT_PAGE,
  LIKE_COZE
} from '../config/ActionTypes'
import _ from 'lodash'

const initial = {
  topics:[],
  cozes: [],
  followed: [],
  created: [],
  tome: [],
  topicPage:{
    total: 1,
    current: 0
  },
  loadingNextPage: false,
  cozePage:{
    total: 1,
    current: 0
  },
  replied:[],
  othez: []
}
export default function home(state=initial,action){
  switch(action.type){
    case LIKE_COZE:
    {
      return Object.assign({},state,{
        cozes: state.cozes.map((t)=>{
          if (t._id == action.cozeId) {
            if (action.like) {
              return Object.assign({},t,{
                likes: [...t.likes,action.fezId]
              })
            }else{
              return Object.assign({},t,{
                likes: t.likes.filter((tl)=> tl!=action.fezId)
              })
            }
          }
          return t
        })
      })
    }
    case LOADING_NEXT_PAGE:
      return Object.assign({},state,{
        loadingNextPage: action.loading
      })
    case NEW_TOPIC:
      return Object.assign({},state,{
        topics: [action.one].concat(state.topics)
      })
    case OTHEZ:
      return Object.assign({},state,{
        othez: _.uniq(state.othez.concat(action.othez),(t)=> t._id)
      })
    case FETCH_FEZ_CREATED:
      return Object.assign({},state,{
        created: action.topics
      })
    case FETCH_FEZ_FOLLOWED:
      return Object.assign({},state,{
        followed: action.topics
      })
    case NEW_COZE:
      console.log(action.coze);
      if (state.cozes.filter((t)=> t._id==action.coze._id).length>0) {
        return state
      }else{
        return Object.assign({},state,{
          cozes: [...state.cozes,action.coze]
        })
      }
    case COZE_NEXT_PAGE:
      return Object.assign({},state,{
        cozes: action.cozes.map((t)=>{
          const fezs = state.othez.filter((f)=> f._id==t.author.id)
          let author = {}, toauthor={}
          if (fezs.length == 1) {
            author = {
              nickname: fezs[0].nickname,
              avatarUrl: fezs[0].avatarUrl,
              id: t.author.id
            }
            return Object.assign({},t,{
              author
            })
          }
          return t
        }),
        cozePage: Object.assign({},state.cozePage,action.pages)
      })
    case TOPIC_NEXT_PAGE:
      return Object.assign({},state,{
        topics: action.topics.map((t)=>{
          const fezs = state.othez.filter((f)=> f._id==t.author.id)
          let author = {}
          if (fezs.length == 1) {
            author = {
              nickname: fezs[0].nickname,
              avatarUrl: fezs[0].avatarUrl,
              id: t.author.id
            }
            return Object.assign({},t,{
              author
            })
          }
          return t
        }).concat(state.topics),
        topicPage: Object.assign({},state.topicPage,action.pages),
        loadingNextPage: false
      })
    case FETCH_TOPICS:
      return Object.assign({},state,{
        topics: state.topics.concat(action.topics.map((t)=>{
          const fezs = state.othez.filter((f)=> f._id==t.author.id)
          let author = {}
          if (fezs.length == 1) {
            author = {
              nickname: fezs[0].nickname,
              avatarUrl: fezs[0].avatarUrl,
              id: t.author.id
            }
            return Object.assign({},t,{
              author
            })
          }
          return t
        })),
        topicPage: action.pages,
        loadingNextPage: false
      })
    default:
      return state
  }
}