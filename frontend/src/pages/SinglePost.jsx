import React from 'react'
import NavBar from '../components/NavBar'
import { GridBackground } from '../components/GridBackground'
import SingleContent from '../components/SingleContent'
import CommentSection from '../components/CommentSection'

function SinglePost() {
  return (
    
    <>
    <NavBar />
    <GridBackground>
        <SingleContent/>
    </GridBackground>
</>
  )
}

export default SinglePost
