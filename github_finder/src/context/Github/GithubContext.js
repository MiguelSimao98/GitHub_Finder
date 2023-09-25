import React,{useState,useEffect,useReducer,createContext} from 'react'
import githubReducer from './Githubreducer'

const GithubContext=createContext()
const GITHUB_URL=process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN=process.env.REACT_APP_GITHUB_TOKEN
export const GithubProvider=({children})=>{
    const initialState={
        users:[],
        loading:false
    }
    const [state,dispatch]=useReducer(githubReducer,initialState)

    const fetchUsers=async()=>{
        setLoading()
        const response= await fetch(`${GITHUB_URL}/users`,{
          headers:{
              'Authorization':`token ${GITHUB_TOKEN}`
          } 
        })
        const usersData = await response.json()
        dispatch({
            type:'GET_USERS',
            payload:usersData,
        })
      }
    
      const searchUser=async(text)=>{
        console.log(text)
        setLoading()
        const params = new URLSearchParams({
            q:text
        })
        const response= await fetch(`${GITHUB_URL}/search/users?${params}`,{
            headers:{
                'Authorization':`token ${GITHUB_TOKEN}`
            } 
        })
        const {items}= await response.json()
        console.log(items)
        dispatch({
            type:'GET_USERS',
            payload:items,
        })
      }
    
      const clearSearch=()=>{
        dispatch({
            type:'CLEAR_USERS',
            payload:[],
        })
      }

    const setLoading=()=>dispatch({
        type:'SET_LOADING'
    })
        
    
    return <GithubContext.Provider value={{ 
        users:state.users,
        loading:state.loading,
        fetchUsers,
        searchUser,
        clearSearch,
     }}>
     {children}
     </GithubContext.Provider>
}

export default GithubContext