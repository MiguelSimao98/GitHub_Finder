import React,{useState,useEffect,useReducer,createContext} from 'react'
import githubReducer from './Githubreducer'

const GithubContext=createContext()
const GITHUB_URL=process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN=process.env.REACT_APP_GITHUB_TOKEN
export const GithubProvider=({children})=>{
    const initialState={
        users:[],
        user:{},
        repos:[],
        loading:false
    }
    const [state,dispatch]=useReducer(githubReducer,initialState)

    return <GithubContext.Provider value={{ 
        ...state,
        dispatch,
     }}>
     {children}
     </GithubContext.Provider>
}

export default GithubContext