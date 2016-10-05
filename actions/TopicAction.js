import {
  FETCH_TOPICS,
  FETCH_COZES,
  NEW_COZE,
  NEW_TOPIC,
  FETCH_FEZ_JOINED,
  FETCH_FEZ_CREATED,
  FETCH_FEZ_VIEWED
} from '../config/ActionTypes'
import axios from 'axios'

export function fetchTopics(long,lat,page){
  return (dispatch)=>{
    axios.get(`http://localhost:3000/topic`,{
      params: {
        long,
        lat,
        page
      }
    }).then((response) => {
        dispatch(topicsFetched(response.data))
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function topicsFetched(topics){
  return {
    type: FETCH_TOPICS,
    topics
  }
}

export function fetchCozes(topicId, id){
  return (dispatch)=>{
    axios.get(`http://localhost:3000/topic/${topicId}`,{
      id
    }).then((response) => {
      const rd = response.data
      dispatch(cozesFetched([rd.topic].concat(rd.cozes)))
    })
    .catch((error) => {
      console.log(error);
    });
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
    axios.put(`http://localhost:3000/topic`, one).then((response) => {
        dispatch(topicCreated(response.data))
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function topicCreated(topicId){
  return {
    type: NEW_TOPIC,
    topicId
  }
}

export function createCoze(topicId, one){
  return (dispatch)=>{
    axios.put(`http://localhost:3000/topic/${topicId}`, one)
      .then((response) => {
        dispatch(cozeCreated( Object.assign({},one,{
          _id: response.data,
          topicId
        })))
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

function cozeCreated(coze){
  return {
    type: NEW_COZE,
    coze
  }
}

export function fetchFezViewed(uid){
  return (dispatch)=>{
    axios.get(`http://localhost:3000/viewed/${uid}`)
      .then((response) => {
        dispatch(fezViewedFetched( response.data ))
      }).catch((error) => {
        console.log(error);
      });
  }
}

function fezViewedFetched(topics){
  return {
    type: FETCH_FEZ_VIEWED,
    topics
  }
}

export function fetchFezJoined(uid){
  return (dispatch)=>{
    axios.get(`http://localhost:3000/joined/${uid}`)
      .then((response) => {
        const rd = response.data
        const cozes = rd.cozes.map((t)=>{
          const topic = rd.topics.filter((tp)=>tp._id==t.topicId)
          if (topic.length==1) {
            return Object.assign({},t,{
              topicTitle: topic[0].content,
              showTitle: true
            })
          }
        })
        console.log(cozes);
        dispatch(fezJoinedFetched( cozes ))
      }).catch((error) => {
        console.log(error);
      });
  }
}

function fezJoinedFetched(topics){
  return {
    type: FETCH_FEZ_JOINED,
    topics
  }
}

export function fetchFezCreated(uid){
  return (dispatch)=>{
    axios.get(`http://localhost:3000/created/${uid}`)
      .then((response) => {        
        dispatch(fezCreatedCreated( response.data ))
      }).catch((error) => {
        console.log(error);
      });
  }
}

function fezCreatedCreated(topics){
  return {
    type: FETCH_FEZ_CREATED,
    topics
  }
}
