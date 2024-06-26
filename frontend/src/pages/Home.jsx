import React from 'react'
import NavBar from '../components/NavBar'
import RecentPosts from '../components/RecentPosts'
import { GridBackground } from '../components/GridBackground'
import HeroSection from '../components/HeroSection'


function Home() {
    return (
        <>
            <NavBar />
            <GridBackground>
            <HeroSection/>
                <RecentPosts />
            </GridBackground>
        </>
    )
}

export default Home
