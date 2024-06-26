import React from 'react'
import { useNavigate } from 'react-router-dom'

function LogoButton() {
    const navigate = useNavigate()
    return (
        <div
            id="toast-top-right"
            className="fixed flex items-center w-full max-w-xs p-4 space-x-4  divide-x rtl:divide-x-reverse top-5 right-1 "
            role="alert"
        >
            <p onClick={() => navigate('/')} className='cursor-pointer font-blink mx-auto text-4xl text-gray font-semibold' >Blink</p>
        </div>
    )
}

export default LogoButton
