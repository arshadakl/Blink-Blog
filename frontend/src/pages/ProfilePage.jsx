import React from 'react'
import NavBar from '../components/NavBar'
import { GridBackground } from '../components/GridBackground'
import ProfileSection from '../components/ProfileSection'

function ProfilePage() {
  return (
    <>
    <NavBar/>
    <GridBackground>
        <ProfileSection/>
    </GridBackground>
    </>
  )
}

export default ProfilePage
