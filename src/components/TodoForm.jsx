
import { useRef } from "react"


export default function TodoForm({add}){
  //UncontrolledComponent 
  const inputRef = useRef()
  
  return(
    <div>
      <input ref={inputRef} />
      <button onClick={click}>추가</button>
    </div>  
  )

  function click(){
    add(inputRef.current.value)
  }
}


/*
react-redux 사용 안했을 때
import useReduxDispatch from "../hooks/useReduxDispatch"
import { addTodo } from "../redux/actions"

export default function TodoForm(){
  //UncontrolledComponent 
  const inputRef = useRef()
  const dispatch = useReduxDispatch()
  
  return(
    <div>
      <input ref={inputRef} />
      <button onClick={click}>추가</button>
    </div>  
  )

  function click(){
    dispatch(addTodo(inputRef.current.value))
  }
}*/