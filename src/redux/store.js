import {applyMiddleware, createStore} from 'redux'
import todoApp from './reducers/reducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

/*
function middleware1(store){
  console.log('middleware1',0)
  return(next) =>{
    console.log('middleware1',1, next)
    return action =>{
      console.log('middleware1',2)
      const returnValue = next(action) //=> middleware2의 action 호출(만약 미들웨어가 한개라면 바로 디스패치 실행)
      console.log('middleware1',3)
      return returnValue
    }
  }
}

function middleware2(store){
  console.log('middleware2',0)
  return(next) =>{
    console.log('middleware2',1,next)
    return action =>{
      console.log('middleware2',2)
      const returnValue = next(action)//그다음 미들웨어가 없기 때문에 디스패치 실행
      console.log('middleware2',3)
      return returnValue
    }
  }
}*/

//const store = createStore(todoApp,applyMiddleware(middleware1,middleware2))//로그는 middleware1 2> middleware2 2> middleware2 3> middleware1 3>

const store = createStore(todoApp,composeWithDevTools(applyMiddleware(thunk,promise)))

export default store