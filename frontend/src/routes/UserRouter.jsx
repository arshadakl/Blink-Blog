import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import CreatePost from '../pages/CreatePost'
import SinglePost from '../pages/SinglePost'
import EditPost from '../pages/EditPost'
import ProfilePage from '../pages/ProfilePage'
import LoginAuth from '../Auth/LoginAuth'
import LogoutAth from '../Auth/LogoutAth'
import AllPost from '../pages/AllPost'
import NotFound from '../pages/NotFound'

function UserRouter() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/post/:id' element={<SinglePost />} />
      <Route path='/allpost' element={<AllPost />} />

      {/* auth routes */}
      <Route element={<LoginAuth />}>
        <Route path='/newpost' element={<CreatePost />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/editpost/:postId' element={<EditPost />} />
      </Route>
      {/*  */}

      <Route element={<LogoutAth />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Route>
      <Route path='*' element={<NotFound />} />

    </Routes>
  )
}

export default UserRouter
