import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const navigate = useNavigate()
    const user = useSelector((state)=>state.user.user)
    console.log(user);
    return (
        <section className="bg-[#36343B]/50 rounded-xl font-blink mt-5">
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <a
                    className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm   rounded-full bg-B1 text-white hover:bg-gray-200 dark:hover:bg-B1/80"
                    role="alert"
                >
                    <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-1">
                    Explore all blogs
                    </span>
                    <svg
                        className="ml-2 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
                <h1 className="mb-4 font-blink text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl text-white">
                Blink: Be seen, be heard.
                </h1>
                <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
                Share your innovative ideas and tech insights with the Blink community. Be seen, be heard, and spark conversations that shape the future.
                </p>
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    
                    {user.username ? <p onClick={()=>navigate('/newpost')}
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border-2 border-B2 hover:bg-B1 focus:ring-4  focus:ring-gray-100 dark:text-white cursor-pointer  dark:focus:ring-gray-800"
                    >
                        
                        Create New Post
                    </p>
                    :
                    <p onClick={()=>navigate('/signup')}
                        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-B1 hover:bg-B1 focus:ring-4 focus:ring-gray-100 dark:text-white cursor-pointer  dark:focus:ring-gray-800"
                    >
                        
                        Join Us
                    </p>}
                </div>
                
            </div>
        </section>

    )
}

export default HeroSection
