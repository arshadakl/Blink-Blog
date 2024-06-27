import React from 'react'
import NavBar from '../components/NavBar'
import { GridBackground } from '../components/GridBackground'
import AllpostSection from '../components/AllpostSection'

function AllPost() {
  return (
    <>
      <NavBar />
      <GridBackground>
        <AllpostSection />
      </GridBackground>
    </>
  )
}

export default AllPost
