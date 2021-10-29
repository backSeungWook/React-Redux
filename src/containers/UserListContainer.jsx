import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../components/UserList";
import { getUsersPromise, getUsersThunk } from "../redux/actions";


export default function UserListContainer(){

  const users = useSelector((state) => state.users.data)
  
  const dispatch = useDispatch()

  /*
  미들웨어 thunk 사용으로 사용안함
  actions -> getUsersThunk 변경
  const getUsers = useCallback(async () =>{
    try{
      dispatch(getUsersStart())
      const res = await axios.get('https://api.github.com/users')
      dispatch(getUsersSuccess(res.data))
    }catch(error){
      dispatch(getUsersFail(error))
    }
  },[dispatch])*/
  
  //미들웨어 thunk 사용으로 재구성.
  const getUsers = useCallback(()=>{
    //dispatch(getUsersThunk())  
    dispatch(getUsersPromise())  
  },[dispatch])

  return <UserList users={users} getUsers={getUsers} />
}