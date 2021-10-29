import { GET_USERS_FULFILLED, GET_USERS_PENDING, GET_USERS_REJECTED, GET_USERS_START, GET_USERS_SUCCESS, GET_USER_FAIL } from "../actions"

const initialState = {
  loading:false,
  data:[],
  error:null
}

export default function users(state=initialState,action){

  /*
  redux-promise-middleware 적용 전
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
  }*/

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