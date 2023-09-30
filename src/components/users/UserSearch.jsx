import React,{useState,useContext} from 'react'
import GithubContext from '../../context/Github/GithubContext'
import AlertContext from '../../context/Github/alert/AlertContext'
import {searchUser} from '../../context/Github/GithubActions'

const UserSearch = () => {
    const [text,setText]=useState('')
    const {dispatch,users}=useContext(GithubContext)
    const {setAlert}=useContext(AlertContext)
    const handleChange=(event)=>{
        setText(event.target.value)
    }

const handleSubmit=async(event)=>{
    event.preventDefault()
    if(text===''){
        setAlert('Please enter something','error')
    }else{
        dispatch({'type':'SET_LOADING'})
        const users= await searchUser(text)
        dispatch({
          'type':'GET_USERS',
          payload : users,
        })
        setText('')
    }
}

const handleClear=()=>{
    dispatch({
        'type':'CLEAR_USERS',
        payload:[],
    })
}
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
        <div>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <div className='relative'>
                        <input 
                        className='w-full pr-40 bg-gray-200 input input-lg text-black'
                        placeholder='Search'
                        value={text}
                        onChange={handleChange}
                        />
                    <button
                        type='submit'
                        className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
                    >Go
                    </button>
                    </div>
                </div>
            </form>
        </div>
        {users.length>0 && (<div>
            <button onClick={handleClear} className='btn btn-ghost btn-lg'>Clear</button>
        </div>)}
        
    </div>
  )
}

export default UserSearch