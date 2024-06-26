import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import CreatePost from '../pages/CreatePost'
import SinglePost from '../pages/SinglePost'
import EditPost from '../pages/EditPost'

function UserRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/post/:id' element={<SinglePost/>}/>
        <Route path='/newpost' element={<CreatePost/>}/>
        <Route path='/editpost/:postId' element={<EditPost/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>

    </Routes>
  )
}

export default UserRouter
