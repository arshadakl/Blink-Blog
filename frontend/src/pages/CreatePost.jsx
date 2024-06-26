import React from 'react'
import NavBar from '../components/NavBar'
import CreatePostForm from '../components/createPostForm'
import { GridBackground } from '../components/GridBackground'

function CreatePost() {
  return (
    <>
    <NavBar/>
    <GridBackground>

    <CreatePostForm/>
    </GridBackground>
    </>
  )
}

export default CreatePost
