
//액션 타입 정의
const ADD_TODO = 'redux-start/todos/ADD_TODO'
const COMPLETE_TODO='redux-start/todos/COMPLETE_TODO'

//액션 생성 함수
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


//초기값
const initialState = []


//리듀서
export default function reducer(previousState=initialState,action){
  //초기값을 설정해주는 부분
  /*if(previousState === undefined){
    return []
  }*/
  if(action.type === ADD_TODO){
    return [...previousState,{text:action.text,done:false}]
  }

  if(action.type === COMPLETE_TODO){
    return previousState.map((todo,index)=>{
      if(index === action.index){
        return {...todo,done:true}
      }
      return todo
    })
  }
    
  return previousState
}