import React from 'react'
import NavBar from '../components/NavBar'
import { GridBackground } from '../components/GridBackground'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  return (
    <>
    <NavBar/>
    <GridBackground>

    
    <section className="h-full">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div className="mx-auto max-w-screen-sm text-center">
      <h1 className="mb-4 text-7xl tracking-tight text-slate-50/50 font-extrabold lg:text-9xl ">
        404
      </h1>
      <p className="font-blink mb-4 text-3xl tracking-tight font-bold text-slate-100 md:text-4xl">
        Blink missing.
      </p>
      <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
        Sorry, we can't find that page. You'll find lots to explore on the home
        page.{" "}
      </p>
      <p onClick={()=>navigate('/')}
        className="inline-flex cursor-pointer underline bg-B1 text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
      >
        Back to Homepage
      </p>
    </div>
  </div>
</section>
</GridBackground>
    </>

  )
}

export default NotFound
