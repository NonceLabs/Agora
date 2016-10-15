import {
  FETCH_TOPICS,
  JOIN_TOPIC,
  VIEW_TOPIC,
  FETCH_COZES,
  NEW_COZE,
  NEW_TOPIC,
  FETCH_FEZ_CREATED,
  FETCH_TOPIC_IN_ARRAY,
  FETCH_FEZ_FOLLOWED,
  OTHEZ,
  REPORT,
  TOPIC_NEXT_PAGE,
  COZE_NEXT_PAGE,
  LOADING_NEXT_PAGE,
  LIKE_COZE
} from '../config/ActionTypes'
import axios from 'axios'
import { io } from '../store/io'
import { SIP } from '../config/index'
import { followTopic } from './FezAction'

export function fetchNextPageTopics(meta){
  io.emit('fetchNearTopics', meta)
  return (dispatch)=>{
    io.removeListener('nearTopicsFetched').on('nearTopicsFetched',(data)=>{
      dispatch(addOthez(data.fezs))
      dispatch((loadingTextPage(true)))
      dispatch(topicsFetched(data.topics,data.topicPage))
    })
  }
}

function nextPageTopicFetched(topics, topicPage){
  return {
    type: TOPIC_NEXT_PAGE,
    topics,
    pages
  }
}

function nextPageCozeFetched(cozes, pages){
  return {
    type: COZE_NEXT_PAGE,
    cozes,
    pages
  }
}

function loadingTextPage(loading){
  return {
    type: LOADING_NEXT_PAGE,
    loading
  }
}

export function fetchTopics(meta){
  io.emit('fetchNearTopics', meta)
  return (dispatch)=>{
    io.removeListener('nearTopicsFetched').on('nearTopicsFetched',(data)=>{
      dispatch(addOthez(data.fezs))
      dispatch(topicsFetched(data.topics,data.topicPage))
    })
  }
}

function topicsFetched(topics,pages){
  return {
    type: FETCH_TOPICS,
    topics,
    pages
  }
}

export function fetchCozes(topicId, page){
  io.emit('fetchTopicById',{
    tid: topicId,
    page
  })
  
  return (dispatch)=>{
    dispatch(nextPageCozeFetched([],{
      current: page
    }))
    io.removeListener('topicByIdFetched').on('topicByIdFetched',(rd)=>{
      dispatch(addOthez(rd.fezs))
      let cozes = []
      if (page == 1) {
        cozes = [rd.topic].concat(rd.cozes)
      }else{
        cozes = rd.cozes
      }
      dispatch(nextPageCozeFetched(cozes,rd.pages))
    })
  }
}

function cozesFetched(cozes){
  return {
    type: FETCH_COZES,
    cozes
  }
}

export function createTopic(one){
  return (dispatch)=>{
    axios.put(`${SIP}topic`, one)
      .then((response) => {
        dispatch(topicCreated(response.data))
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function topicCreated(one){
  return {
    type: NEW_TOPIC,
    one
  }
}

export function createCoze(topicId, one, followed, cozeTo){
  io.emit('continueTopic', {
    coze: Object.assign({}, one, {
      topicId
    }),
    cozeTo
  })
  return (dispatch)=>{
    if (!followed) {
      dispatch(followTopic(one.author.id, topicId, true))
    }
    io.removeListener('cozeCreated').on('cozeCreated',(data)=>{
      dispatch(cozeCreated(data))
    })
  }
}

function cozeCreated(coze){
  return {
    type: NEW_COZE,
    coze
  }
}

export function fetchTopicInArray(tids, type, uid){
  io.emit('fetchTopicInArray',{
    tids
  })

  return (dispatch)=>{
    io.removeListener('topicInArrayFetched').on('topicInArrayFetched',(data)=>{
      switch(type){
        case "created":
          dispatch(fezCreatedFetched(data.topics))
          break;
        default:
          dispatch(fezFollowedFetched(data.topics))
          break;
      }
    })
  }
}

export function fetchFezFollowed(all){
  return (dispatch)=>{
    axios.get(`${SIP}topics`,{
      params: {all:all}
    })
      .then((response) => {
        dispatch(fezFollowedFetched(response.data))
      }).catch((error) => {
        console.log(error);
      });
  }
}

function fezFollowedFetched(topics){
  return {
    type: FETCH_FEZ_FOLLOWED,
    topics
  }
}

export function fetchFezCreated(all){
  return (dispatch)=>{
    axios.get(`${SIP}topics`,{
      params: {all}  
    })
      .then((response) => {        
        dispatch(fezCreatedFetched(response.data))
      }).catch((error) => {
        console.log(error);
      });
  }
}

function fezCreatedFetched(topics){
  return {
    type: FETCH_FEZ_CREATED,
    topics
  }
}

function addOthez(othez){
  return {
    type: OTHEZ,
    othez
  }
}

export function reportCoze(one){
  return (dispatch)=>{
    axios.put(`${SIP}report`,one).then((response) => {        
        dispatch(cozeReported( response.data.code ))
      }).catch((error) => {
        console.log(error);
      });
  }
}

function cozeReported(code){
  return {
    type: REPORT
  }
}

export function likeCoze(coze, fromFez, like, toFez){
  return (dispatch)=>{
    axios.post(`${SIP}coze/like/${coze.id}`,{
      fromFez,like,toFez,coze
    })
      .then((response) => {
        dispatch(cozeLiked(coze.id, fromFez.id, like))
      }).catch((error) => {
        console.log(error);
      });
  }
}

function cozeLiked(cozeId, fezId, like){
  return {
    type: LIKE_COZE,
    cozeId,
    fezId,
    like
  }
}