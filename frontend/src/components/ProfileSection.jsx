import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DateFormater } from '../utils/DateFormater'
import { _deletePost, _getUserPost, _updateProfile } from '../utils/API/BlogApi'
import { handleError } from '../utils/API/errorHandler'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { MdOutlineMail } from 'react-icons/md'
import { CgCalendarDates } from 'react-icons/cg'
import { updateProfileURL } from '../redux/userSlice'
import { initFlowbite } from 'flowbite'

function ProfileSection() {
    initFlowbite()
    const user = useSelector((state) => state.user.user)
    const dispatch = useDispatch()
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const fetchData = async () => {
        try {
            const response = await _getUserPost()
            if (response.status) {
                console.log(response.posts);
                setPosts(response.posts)
            }
        } catch (error) {
            const errorMessage = handleError(error);
            toast.error(errorMessage)
        }
    }

    useEffect(() => {
        fetchData()
        initFlowbite()
    }, [])

    useEffect(() => {
        setPreviewUrl(user.profileURL)
    }, [user.profileURL])


    const handleSave = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await _updateProfile(formData)
            if (response.status) {
                dispatch(updateProfileURL(response.user.profileURL));
                setIsUploading(false)
                setSelectedFile(null)
                toast.success(response.message)
            }
        } catch (error) {
            const errorMessage = handleError(error);
            toast.error(errorMessage)
        }
    };


    const handileDelete = async(postId)=>{
        try {
            const response = await _deletePost(postId)
            if (response.status) {
                setPosts(response.posts)
            }
        } catch (error) {
            const errorMessage = handleError(error);
            toast.error(errorMessage)
        }
    }
    return (
        <>
            <div className="p-relative min-h-screen h-full bg-B1/50 w-full" >
                <div className="flex justify-center  ">
                    <main role="main ">
                        <div className="flex  ">
                            <section className="md:w-11/12 mx-auto  ">
                                <div>
                                    <div className="w-full  rounded-xl mt-5  bg-B2/80" style={{ height: '200px', minWidth: "75vw" }}>
                                    </div>
                                    <div className="md:p-4 =-0 md:mx-10 mx-0">


                                        <div className="relative flex w-full">
                                            <div className="flex flex-1">
                                                <div style={{ marginTop: '-6rem' }}>
                                                    <div style={{ height: '9rem', width: '9rem' }} className="md avatar relative rounded-full">
                                                        {previewUrl ? (
                                                            <img
                                                                src={previewUrl}
                                                                alt="Profile preview"
                                                                className="w-full h-full rounded-full object-cover border-4 border-gray-900"
                                                            />
                                                        ) : (
                                                            // <div className="w-full h-full rounded-full bg-white border-4 border-gray-900"></div>
                                                            <div className='bg-[#121212] rounded-full w-full h-full mx-auto p-1 text-center'>

                                                                <button className='bg-green-100 font-F2 text-5xl font-bold text-[#121212]  rounded-full mx-auto p-1 text-center w-full h-full uppercase'>
                                                                    {user?.username[0]}
                                                                </button>
                                                            </div>
                                                        )}
                                                        <div className="absolute bottom-0 right-0">
                                                            <input
                                                                type="file"
                                                                ref={fileInputRef}
                                                                accept="image/*"
                                                                onChange={handleFileSelect}
                                                                style={{ display: 'none' }}
                                                            />
                                                            <button
                                                                onClick={handleButtonClick}
                                                                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {selectedFile && (
                                                <div className="flex flex-col text-right">
                                                    <button
                                                        onClick={handleSave}
                                                        disabled={isUploading}
                                                        className="ml-auto mr-0 flex max-h-max max-w-max items-center justify-center whitespace-nowrap rounded-full border border-green-500 bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 focus:outline-none focus:ring"
                                                    >
                                                        {isUploading ? 'Saving...' : 'Save'}
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="ml-3 mt-3 w-full justify-center space-y-1">
                                            <div>
                                                <h2 className="text-xl font-bold leading-6 text-white font-blink">{user?.username}</h2>
                                                <h2 className="text-md font-bold leading-6 text-gray-400 flex"> {user?.email}</h2>
                                            </div>
                                            <div className="mt-3">
                                                <div className="flex text-gray-600">
                                                    <span className="mr-2 my-1 flex">
                                                        <span className=" leading- flex"><CgCalendarDates size={23} className='mx-1' /> Joined {DateFormater(user?.created_at)}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="border-gray-800" />
                                </div>

                                <ul className="list-none px-10 ">
                                    {posts && posts?.map((post) => {
                                        return (
                                            <li key={post.postID}>
                                                <article className="duration-350 transition ease-in-out hover:bg-B1">
                                                    <div className="flex flex-shrink-0 p-4 pb-0">
                                                        <p className="group block flex-shrink-0">
                                                            <div className="flex items-center">

                                                                <div className="ml-3">
                                                                    <p className="text-base font-medium ml-8 my-2 text-white">
                                                                        <span className="text-sm font-medium leading-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-gray-300">Posted on {DateFormater(post.created_at)} 16 April </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </p>
                                                    </div>

                                                    <div className="pl-16 w-full">
                                                        <p className="width-auto flex-shrink text-base font-medium text-white">
                                                            {post.title}
                                                        </p>

                                                        {post.imageUrl && <div className="pr-6 pt-3 md:flex-shrink">
                                                            <div className="h-64 w-full rounded-lg bg-cover bg-center bg-no-repeat" style={{ height: '200px', backgroundImage: `url(${post.imageUrl})` }}>
                                                                <img className="h-full w-full opacity-0" src={post.imageUrl} alt="" />
                                                            </div>
                                                        </div>}

                                                        <div className="flex py-4 w-full gap-3">
                                                            <div className="  bg-red-50  flex  font-bold rounded-md items-start text-xs text-gray-400 stransition ease-in-out ">
                                                                <button onClick={() => navigate(`/editpost/${post.postID}`)} className=' bg-slate-50 text-gray-900 hover:text-gray-600 p-2 rounded-md '>Edit Post</button>
                                                            </div>
                                                            <div className="bg-red-50  flex  font-bold rounded-md items-start text-xs text-gray-400 stransition ease-in-out ">
                                                                <button data-modal-target={post.postID}
                                                                    data-modal-toggle={post.postID} className=' bg-slate-50 text-gray-900 hover:text-gray-600 p-2 rounded-md '>Delete Post</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
    id={post.postID}
    tabIndex={-1}
    className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div className="relative p-4 w-full max-w-md max-h-full">
      <div className="relative  rounded-lg shadow bg-B1">
        <button
          type="button"
          className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide={post.postID}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="p-4 md:p-5 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-400">
            Are you sure you want to delete this product?
            {post.title}
          </h3>
          <button
            onClick={()=>handileDelete(post.postID)}
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            Yes, I'm sure
          </button>
          <button
            data-modal-hide={post.postID}
            type="button"
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  </div>
                                                </article>
                                                <hr className="border-gray-800" />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </section>
                        </div>
                    </main>
                </div>
                <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar, .overflow-y-scroll::-webkit-scrollbar, .overflow-x-auto::-webkit-scrollbar, .overflow-x::-webkit-scrollbar, .overflow-x-scroll::-webkit-scrollbar, .overflow-y::-webkit-scrollbar, body::-webkit-scrollbar {
          display: none;
        }

        .overflow-y-auto, .overflow-y-scroll, .overflow-x-auto, .overflow-x, .overflow-x-scroll, .overflow-y, body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .bg-dim-700 {
          --bg-opacity: 1;
          background-color: #192734;
        }

        html, body {
          margin: 0;
          background-color: #15202b;
        }

        svg.paint-icon {
          fill: currentcolor;
        }
      `}</style>
            </div>
        </>
    )
}

export default ProfileSection
