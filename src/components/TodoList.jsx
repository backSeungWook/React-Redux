
export default function TodoList({todos}){
  return(
    <ul>
      {todos.map((todo)=>{
       return <li >{todo.text}</li>
      })}
    </ul>
  ) 
}



/*react-redux 사용 안했을 때
import useReduxState from "../hooks/useReduxState"

export default function TodoList(){
  const state = useReduxState()

  return(
    <ul>
      {state.todos.map((todo)=>{
       return <li >{todo.text}</li>
      })}
    </ul>
  ) 
}
*/