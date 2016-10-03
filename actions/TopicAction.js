import {
  FETCH_TOPICS,
  FETCH_COZES,
  NEW_COZE,
  NEW_TOPIC
} from '../config/ActionTypes'
import axios from 'axios'

export function fetchTopics(long,lat,page){
  return (dispatch)=>{
    axios.get(`http://localhost:3000/topic`,{
      long,
      lat,
      page
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
        dispatch(cozesFetched(response.data))
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