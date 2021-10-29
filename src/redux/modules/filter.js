import {createActions,  handleActions} from 'redux-actions'

//prefix: 네임스페이스 설정 (redux-start/filter)


//액션 Type 정의
/*const SHOW_ALL='redux-start/filter/SHOW_ALL'
const SHOW_COMPLETE='redux-start/filter/SHOW_COMPLETE'

//액션 생성 함수
export function showAll(){
  return {type:SHOW_ALL}
}

export function showComplete(){
  return {type:SHOW_COMPLETE}
}

redux-actions의 createActions() 으로 대체
*/

//액션 Type 정의 , 액션 생성 함수
export const {SHOW_ALL,SHOW_COMPLETE} = createActions('SHOW_ALL','SHOW_COMPLETE',{prefix:'redux-start/filter'})

//초기값.
const initialState = 'ALL'


//리듀서
const reducer = handleActions({
  SHOW_ALL:(state,action)=>'ALL',
  SHOW_COMPLETE:()=>'SHOW_COMPLETE'
},initialState,{prefix:'redux-start/filter'})

export default reducer

/*redux-actions의 handleActions()로 대체
export default function reducer(previousState=initialState,action){
  if(action.type === SHOW_COMPLETE){
    return 'COMPLETE'
  }

  if(action.type === SHOW_ALL){
    return 'ALL'
  }

    
  return previousState
}*/