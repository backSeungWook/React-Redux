
import axios from "axios"
// 액션의 type 정의
// 액션의 타입 => 액션 생성자 이름
// ADD_TODO => addTodo
export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO='COMPLETE_TODO'
export const SHOW_ALL='SHOW_ALL'
export const SHOW_COMPLETE='SHOW_COMPLETE'


// 액션 생산자
// 액션의 타입은 미리 정의한 타입으로 부터 가져와서 사용하며,
// 사용자가 인자로 주지 않음.
export function addTodo(text){
  return{ // { type: ADD_TODO, text: text }
    type:ADD_TODO,
    text
  }
}

    
//{type:COMPLETE_TODO,index:3}
export  function completeTodo(index){
  return{
    type:COMPLETE_TODO,
    index
  }
}

export function showAll(){
  return {type:SHOW_ALL}
}

export function showComplete(){
  return {type:SHOW_COMPLETE}
}

//users
export const GET_USERS_START='GET_USERS_START'//깃헙 API 호출 시작
export const GET_USERS_SUCCESS='GET_USERS_SUCCESS'//깃헙 API 호출에 대한 응답 성공
export const GET_USER_FAIL = 'GET_USER_FAIL';//깃헙 API 호출에 대한 응답 실패

export function getUsersStart(){
  return{
    type:GET_USERS_START
  }
}

export function getUsersSuccess(data){
  return{
    type:GET_USERS_SUCCESS,
    data

  }
}

export function getUsersFail(error){
  return{
    type:GET_USER_FAIL,
    error
  }
}


export function getUsersThunk(){
  
  return async (dispatch)=>{
    try{
      dispatch(getUsersStart())
      const res = await axios.get('https://api.github.com/users')
      dispatch(getUsersSuccess(res.data))
    }catch(error){
      dispatch(getUsersFail(error))
    }
  }
}

const GET_USERS='GET_USERS'
export const GET_USERS_PENDING='GET_USERS_PENDING' //start
export const GET_USERS_FULFILLED='GET_USERS_FULFILLED'//Success
export const GET_USERS_REJECTED='GET_USERS_REJECTED'//Fail

export function getUsersPromise(){
  return {
    type:GET_USERS,
    //payload Promise 로직 작성.
    payload: async ()=>{
      const res = await axios.get('https://api.github.com/users') 
      return res.data
    }
  }
}
