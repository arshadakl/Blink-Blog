import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { _getSinglePost } from '../utils/API/BlogApi'
import { handleError } from '../utils/API/errorHandler'
import { toast } from 'sonner'
import { DateFormater } from '../utils/DateFormater'
import CommentSection from './CommentSection'
import Single from './skeleton/Single'

function SingleContent() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [post, setPost] = useState()
    const [author, setAuthor] = useState()
    const [loading,setLoading] = useState(true)
    const fetchData = async () => {
        try {
            if (!id) {
                navigate('/')
            }
            const response = await _getSinglePost(id)
            if (response.status) {
                setPost(response?.post)
                setAuthor(response?.user)
                setLoading(false)
            }
        } catch (error) {
            const errorMessage = handleError(error);
            toast.error(errorMessage)
            navigate('/')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="mx-auto max-w-screen-lg">
            {/* header */}
            {/* header ends here */}
            
            <main className="mt-10">

                {
                    loading ? 
                    <Single/>:
                    <>
                
                
                <div className="relative mx-auto mb-4 w-full md:mb-0 px-2">
                    <div className="px-4 lg:px-0">
                        <h2 className="text-4xl font-semibold  font-blink leading-tight text-slate-50">
                            {post?.title}
                        </h2>
                        <p className="text-md font-normal my-2 text-gray-100/70 font-mono">{post && DateFormater(post?.created_at)}</p>
                    </div>
                    {
                    post?.imageUrl && <img
                        src={post?.imageUrl}
                        className="w-full object-cover  lg:rounded"
                        style={{ height: "28em" }}
                    />}
                </div>
                <div className="flex flex-col lg:flex-row lg:space-x-12">
                    <div className="mt-12 w-full px-4 text-lg leading-relaxed text-gray-700 lg:w-3/4 lg:px-0">
                        <p className="pb-6 text-white/80 ">
                            {post?.content}
                        </p>

                    </div>
                    <div className="m-auto mt-12 w-full max-w-screen-sm lg:w-1/4">
                        <div className="border-b border-t p-2 md:rounded md:border">
                            <div className="flex py-2">
                                {author?.profileURL ? <img
                                    src={author?.profileURL}
                                    className="mr-2 h-10 w-10 rounded-full object-cover"
                                /> :

                                    <div className='bg-[#121212] rounded-full mx-2 p-1 text-center'>

                                        <button className='bg-green-100 font-bold text-[#121212]  rounded-full mx-auto p-1 w-10 text-center h-10 uppercase'>
                                            {author?.username[0]}
                                        </button>
                                    </div>
                                }
                                <div>
                                    <p className="text-sm font-semibold text-slate-100">
                                        {author && author?.username}
                                    </p>
                                    <p className="text-xs font-normal text-gray-100">Editor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 w-full px-4 text-lg leading-relaxed text-gray-700 lg:w-3/4 lg:px-0  ">
                    <CommentSection />

                </div>
                </>}
            </main>
        </div>

    )
}

export default SingleContent
