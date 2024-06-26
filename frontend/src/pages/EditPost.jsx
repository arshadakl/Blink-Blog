import React from 'react'
import NavBar from '../components/NavBar'
import { GridBackground } from '../components/GridBackground'
import EditPostForm from '../components/EditPostForm'

function EditPost() {
    return (
        <>
            <NavBar />
            <GridBackground>
                <EditPostForm />
            </GridBackground>
        </>
    )
}

export default EditPost
