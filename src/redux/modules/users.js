
import axios from "axios"
import { push } from "connected-react-router";
import {put,delay,call,takeEvery} from 'redux-saga/effects'

//액션 타입 정의
const GET_USERS_START='redux-start/users/GET_USERS_START'//깃헙 API 호출 시작
const GET_USERS_SUCCESS='redux-start/users/GET_USERS_SUCCESS'//깃헙 API 호출에 대한 응답 성공
const GET_USER_FAIL = 'redux-start/users/GET_USER_FAIL';//깃헙 API 호출에 대한 응답 실패

// redux-promise-middleware
const GET_USERS='redux-start/users/GET_USERS'
const GET_USERS_PENDING='redux-start/users/GET_USERS_PENDING' //start
const GET_USERS_FULFILLED='redux-start/users/GET_USERS_FULFILLED'//Success
const GET_USERS_REJECTED='redux-start/users/GET_USERS_REJECTED'//Fail

//액션 생성 함수


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


//초기값
const initialState = {
  loading:false,
  data:[],
  error:null
}

//리듀서
export default function reducer(state=initialState,action){

  
  //
  if(action.type === GET_USERS_START){
    return{
      ...state,
      loading:true,
      error:null
    }
  }

  if(action.type === GET_USERS_SUCCESS){
    return{
      ...state,
      loading:false,
      data:action.data
    }
  }

  if(action.type === GET_USER_FAIL){
    return{
      ...state,
      loading:false,
      error:action.error
    }
  }

  //redux-promise-middleware 적용후 
  if(action.type === GET_USERS_START || action.type === GET_USERS_PENDING){
    return{
      ...state,
      loading:true,
      error:null
    }
  }

  if(action.type === GET_USERS_FULFILLED){
    return{
      ...state,
      loading:false,
      data:action.payload
    }
  }

  if(action.type === GET_USERS_REJECTED){
    return{
      ...state,
      loading:false,
      error:action.payload
    }
  }
  return state

}

//redux-promise-middlewar
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

function sleep(ms){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve()
    }, ms)
  })
}

//reudx-Thunk
export function getUsersThunk(){
  
  return async (dispatch,getState,{history})=>{
    try{
      console.log(history)
      dispatch(getUsersStart())
      await sleep(2000)
      const res = await axios.get('https://api.github.com/users')
      dispatch(getUsersSuccess(res.data))

      history.push('/')
    }catch(error){
      dispatch(getUsersFail(error))
    }
  }
}


//redux-saga
const GET_USERS_SAGA_START='GET_USERS_SAGA_START'

function* getUserSaga(action){
  try{
 
    yield put(getUsersStart())// =dispatch(getUsersStart())
    
    yield delay(2000)//=await sleep(2000)
    const res = yield call(axios.get,'https://api.github.com/users')// = const res = await axios.get('https://api.github.com/users')
  
    yield put(getUsersSuccess(res.data)) // = dispatch(getUsersSuccess(res.data))
    yield delay(2000)//=await sleep(2000)
    yield put(push('/')) // =history.push('/')
  }catch(error){
    yield put(getUsersFail(error)) // = dispatch(getUsersFail(error))
  }
}

//sage를 사용 하기 위한 함수
export  function getUserSagaStart(){
  return{
    type:GET_USERS_SAGA_START
  }
}

// saga 등록
export function* usersSage(){
  yield takeEvery('GET_USERS_SAGA_START',getUserSaga)
}