# Redux
예측 가능한 상태 컨테이너  
https://ko.redux.js.org/introduction/getting-started
```
npm i redux
```

## Action
장소로 data를 보내는 방법
두 가지 형태의 액션
type 만이 필수 프로퍼티이며, type 은 문자열이고, 함수를 통해 액션을 생성
```js
{ type: 'TEST' } // payload 없는 액션
{ type: 'TEST', params: 'hello' } // payload 있는 액션
```

## 리듀서
action을 통해 어떠한 행동을 정의했다면, 그 결과 어플리케이션의 상태가 어떻게 바뀌는지는 특정하게 되는 함수
```js
function 리듀서(previousState,action){
  return newState
}
//인자로 들어오는 previousState와 리턴되는 newSate는 다른 참조를 가지도록 해야한다.
```

## Store
### `createStore`
스토어를 만드는 함수
```js
import {createStore} from 'redux'

createStore<S>(
  reducer: Reducer<S>,
  preloadedState: S,
  enhancer?: StoreEnhancer<S>
): Store<S>;
```
```js
import {createStore} from 'redux'
import {todoApp} from './reducers'

const store = createStore(todoApp)

export default store
```
### `getState`
현재 store의 State를 가지고 옴.

### `dispatch`
인자로 Action을 넣어서 Store의 상태를 변경.
```js
import {addTodo} from './redux/actions'

store.dispatch(addTodo("coding"))
```

### `subscribe`
subscribe store 변경을 감지  
리턴으로 unsubscribe()을 리턴 / unsubscribe 을 호출하면 subscribe 제거  
subscribe 제거: subscribe메소드가 실행이 안됨 / 변경을 감지 하지 않음.
```js
const unsubscribe = store.subscribe(()=>{
  console.log(store.getState())
})

```

## `combineReducers`
https://lunit.gitbook.io/redux-in-korean/recipes/structuringreducers/usingcombinereducers  
리덕스 리듀서를 작성할 때 가장 일반적인 용례를 단순화 하는 유틸리티 함수.(하위리덕스를 합치는 역활)   
모든 애플리케이션에서 사용할 필요는 없으며 모든 가능한 시나리오를 처리하지 않음.   
이 함수를 사용하지 않고도 리듀서로직을 작성할 수 있으며, combineReducers를 사용하지 않는 경우는 보통 커스텀 리듀서를 직접 만들어줘야 한다.
```js
//redux/modules/reducer.js
//하위리덕스를 합치는 역활: combineReducers
const reducer = combineReducers({
  todos,
  filter,
  users,
  router:connectRouter(history)
})
```

## Redux를 React에 연결

### react-redux 안쓰고 연결
단일 store 를 만들고, subscribe 와 getState 를 이용하여,   
변경되는 state 데이터를 얻어, props 로 계속 아래로 전달   
componentDidMount - subscribe`(store 변경을 감지)`   
componentWillUnmount - unsubscribe`(subscribe 제거)`
```js
//index.js
<App store={store}/>
```
```js
//hooks/useReduxState.js 단일 스토어 생성
export default function useReduxState(){
  const store = useContext(ReduxContext)
  const [state,setState]=useState(store.getState())

  useEffect(()=>{
    const unsubscribe = store.subscribe(()=>{
      setState(store.getState())
    })
    return ()=>{
      unsubscribe()
    }
  },[store])

  return state
}

```
Context를 이용하여 전역으로 Store 전달하기
```js
//index.js
<ReduxContext.Provider value={store}>
  <App/>
</ReduxContext.Provider>
```

### `react-redux 사용.`
```
npm i react-redux
```
Provider 컴포넌트를 제공해며, connect 함수를 통해 "컨테이너"를 만든다.
컨테이너는 스토어의 state 와 dispatch(액션) 를 연결한 컴포넌트에 props 로 넣어주는 역할
```js
//컨테이너 사용방식
//첫번째 함수의인자는 Config /2번째 함수의 인자에는 연결할 함수명
const TodoListContainer = connect(
  StateToProps,//state를 받아서 Props로 반환
  DispatchToProps//Dispatch를 받아서 Props로 반환
)(TodoList)

```
`useSelector`: connect함수를 이용하지 않고 리덕스의 state를 조회할 수 있다.  
```js
import { useSelector } from 'react-redux' 
const user = useSelector(state => state.user);
```
`useDispatch`: 생성한 action을 useDispatch를 통해 발생시킬 수 있다
```js
//만들어둔 액션생성 함수를 import한다.
import { change_user } from '../modules/user'
import { useDispatch } from 'react-redux' 

const User = () => { 
  ... 
  const dispatch = useDispatch(); dispatch(change_user(user)); 
  ...
}
```

## Redux 비동기 처리
API 호출 시점은 componentDidMount 시점에서 호출.
```js
//UserListContainer.js 비동기는 react-redux 부분에서 처리(유지보수).

 const getUsers = useCallback(async () =>{
      try{
        dispatch(getUsersStart())
        const res = await axios.get('https://api.github.com/users')
        dispatch(getUsersSuccess(res.data))
      }catch(error){
        dispatch(getUsersFail(error))
      }  
    },[dispatch])
```

## 미들웨어
디스패치의 앞뒤에 코드를 추가할수 있게 해준다.
미들웨어가 여러개면 미들웨어가 순차적으로 실행   
비동기처리는 미들웨어 쪽에서 처리
```js
//redux/store.js

import {applyMiddleware, createStore} from 'redux'
import todoApp from './reducers/reducer'

function middleware1(store){
  console.log('middleware1',0)
  return(next) =>{
    console.log('middleware1',1)
    return action =>{
      console.log('middleware1',2)
      const returnValue = next(action)
      console.log('middleware1',3)
      return returnValue
    }
  }
}
const store = createStore(todoApp,applyMiddleware(middleware1))

export default store
```
### `redux-devtools`
리덕스 개발용 툴 
```
npm i redux-devtools-extension -D
```

### `redux-thunk`
https://github.com/reduxjs/redux-thunk  
리덕스에서 비동기 처리를 위한 라이브러리  
액션 생성자를 활용하여 비동기 처리   
액션 생성자가 액션을 리턴하지 않고, 함수를 리턴함   
```
npm i redux-thunk
```
```js
//store.js
//미들웨어에 thunk 설정.
import thunk from 'redux-thunk'
const store = createStore(todoApp,composeWithDevTools(applyMiddleware(thunk)))
```
```js
//actions.js
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

//actions 호출
//UserListContainer.jsx
//미들웨어 thunk 사용으로 재구성.
const getUsers = useCallback(()=>{
  dispatch(getUsersThunk())  
},[dispatch])

```

### redux-promise-middleware
비동기 처리를 위한 라이브러리
https://pburtchaell.gitbook.io/redux-promise-middleware type이 변경 되어서 적용이 됨   
뒤에 ex) GET_USERS_(PENDING,FULFILLED,REKECTED)붙어서 type이 재정의 됨.   
PENDING : START   
FULFILLED : SUCCESS   
REKECTED : FAIL   

```
npm i redux-promise-middleware
```

```js
//store.js
import promise from 'redux-promise-middleware'

const store = createStore(todoApp,composeWithDevTools(applyMiddleware(promise)))
```

```js
//적용
//actions.js
const GET_USERS='GET_USERS'
//type이 변경 되어서 적용이 됨에 따라 type 재설정
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


//type이 변경 되어서 적용이 됨에 따라 type 리턴 변경
// reducers/users.js
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

//actions 호출
//미들웨어 promise-middleware 사용으로 재구성.
//UserListContainer.jsx
const getUsers = useCallback(()=>{
  dispatch(getUsersPromise())  
},[dispatch])
```

## `Ducks Pattern`
https://github.com/JisuPark/ducks-modular-redux
규칙
1. export default 함수명을 항상 reducer란 이름으로 정의
1. 항상 모듈의 action 생성자들을 함수형태로 export 
1. 항상 npm-module-or-app/reducer/ACTION_TYPE 형태의 action 타입을 가져야한다
```js
//ex
//redux/modules/filter.js
const SHOW_ALL='redux-start/filter/SHOW_ALL'
```
1. 어쩌면 action 타입들을 UPPER_SNAKE_CASE로 export 할 수 있으며. 만약, 외부 reducer가 해당 action들이 발생하는지 계속 기다리거나, 재사용할 수 있는 라이브러리로 퍼블리싱할 경우에 말이죠.


```js
//액션 Type, 액션 생성 함수, 초기값, 리듀서

//액션 Type 정의
//3. 항상 npm-module-or-app/reducer/ACTION_TYPE 형태의 action 타입을 가져야한다
const SHOW_ALL='redux-start/filter/SHOW_ALL'
const SHOW_COMPLETE='redux-start/filter/SHOW_COMPLETE'

//액션 생성 함수
//2. 항상 모듈의 action 생성자들을 함수형태로 export 
export function showAll(){
  return {type:SHOW_ALL}
}

export function showComplete(){
  return {type:SHOW_COMPLETE}
}

//초기값.
const initialState = 'ALL'


//리듀서
// 1. export default 함수명을 항상 reducer란 이름으로 정의
export default function reducer(previousState=initialState,action){
  if(action.type === SHOW_COMPLETE){
    return 'COMPLETE'
  }

  if(action.type === SHOW_ALL){
    return 'ALL'
  }
  return previousState
}
```

## `connected-react-router`
react-router-dom 과 redux 같이 사용하기 위한 라이브러리
```
npm i connected-react-router
```
```js
//App.js
import { ConnectedRouter } from 'connected-react-router';
...

function App() {
  return (
    <ConnectedRouter history={history}>
      <Route path='/' exact component={Home} />
      <Route path='/todos' component={Todos} />
      <Route path='/users' component={Users}  />
    </ConnectedRouter>
  );
}
```

## `redux-saga`
https://redux-saga.js.org  
제너레이터 객체를 만들어 내는 제네레이터 생성 함수를 이용   
리덕스 사가 미들웨어를 설정하고, 내가 만든 사가 함수를 등록한 후 사가 미들웨어를 실행   
등록된 사가 함수를 실행할 액션을 디스패치  
```
 npm i redux-saga
```
```js
//sage 함수 정의
//redux/modules/users.js
//sage 함수는 function* 함수앞에 *추가
import { push } from "connected-react-router";
import {put,delay,call} from 'redux-saga/effects'

//redux-saga
const GET_USERS_SAGA_START='GET_USERS_SAGA_START'

function* getUserSaga(action){
  try{
 
    yield put(getUsersStart())// =dispatch(getUsersStart())
    
    yield delay(2000)//=await sleep(2000)
    const res = yield call(axios.get,'https://api.github.com/users')// = const res = await axios.get('https://api.github.com/users')
  
    yield put(getUsersSuccess(res.data)) // = dispatch(getUsersSuccess(res.data))
    
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
```

```js
//rootSage Sage들의 집합소
import { all } from "@redux-saga/core/effects";
import { usersSage } from "./users";

export default function* rootSage(){
  yield all([usersSage()])
}

//store.js
import createSagaMiddleware from '@redux-saga/core'
import rootSage from './modules/rootSage'

const sageMiddleware = createSagaMiddleware()

const store = createStore(
  todoApp,composeWithDevTools(
    applyMiddleware(
        ...        
        sageMiddleware
      )
    )
  )

  //createStore 후
  sageMiddleware.run(rootSage)
```

## `redux-actions`
https://github.com/redux-utilities/redux-actions
```
npm i redux-actions
```
```js
import {createActions,  handleActions} from 'redux-actions'

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

```