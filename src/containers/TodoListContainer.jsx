import { useSelector } from "react-redux"
import TodoList from '../components/TodoList'


function TodoListContainer(){
  const todos = useSelector((state)=>{
    return state.todos
  })
  return <TodoList todos={todos}/>
}

export default TodoListContainer