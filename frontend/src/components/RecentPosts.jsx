import React, { useEffect, useState } from 'react'
import { _getPost } from '../utils/API/BlogApi'
import { handleError } from '../utils/API/errorHandler'
import { toast } from 'sonner'
import { ShortString } from '../utils/ShortString'
import { DateFormater } from '../utils/DateFormater'
import { useNavigate } from 'react-router-dom'
import Recent from './skeleton/Recent'

function RecentPosts() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    const fetchData = async () => {
        try {
            const response = await _getPost()
            if (response.status) {
                setPosts(response.posts)
                setLoading(false)
            }
        } catch (error) {
            const errorMessage = handleError(error);
            toast.error(errorMessage)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <div>
            <section className="py-6 sm:py-8 lg:py-12">
                <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                    {/* Heading */}
                    <div className="mb-10 md:mb-16 font-blink">
                        <h2 className="mb-4 text-center text-2xl font-semibold text-slate-50 md:mb-6 lg:text-3xl">
                            Most Recent Posts
                        </h2>
                        <p className="mx-auto max-w-screen-md text-center text-slate-50/80 md:text-lg">
                            Don't miss a beat! Stay updated on the newest ideas and tech insights.
                        </p>
                    </div>
                    {/* /Heading */}
                    <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
                        {/* Article */}
                        {loading ? 
                            <>
                                <Recent/>
                                <Recent/>
                            </>
                            :
                            posts && posts.length > 0 ? 
                                posts.slice(0,6).map((post) =>
                                    <article key={post.postID} onClick={() => navigate(`/post/${post.postID}`)} className="flex flex-col items-center gap-4 md:flex-row lg:gap-6">
                                        {post?.imageUrl && 
                                            <p className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
                                                <img
                                                    src={post.imageUrl}
                                                    loading="lazy"
                                                    alt=""
                                                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                                />
                                            </p>
                                        }
                                        <div className="flex flex-col gap-2">
                                            <span className="text-sm text-gray-400">{DateFormater(post.created_at)}</span>
                                            <h2 className="text-xl font-bold text-slate-50">
                                                <p className="cursor-pointer transition duration-100 hover:text-rose-500 active:text-rose-600">
                                                    {post.title}
                                                </p>
                                            </h2>
                                            <p className="text-gray-200">
                                                {ShortString(post.content, 150)}
                                            </p>
                                            <div>
                                                <p className="font-semibold text-rose-500 transition duration-100 hover:text-rose-600 active:text-rose-700">
                                                    Read more
                                                </p>
                                            </div>
                                        </div>
                                    </article>
                                )
                                : <p className="text-slate-50">No posts available.</p>
                        }
                        {/* /Article */}
                    </div>
                </div>
            </section>

            <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                <p onClick={() => navigate('/allpost')}
                    className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border-2 border-B2 hover:bg-B1 focus:ring-4 focus:ring-gray-100 dark:text-white cursor-pointer dark:focus:ring-gray-800"
                >
                    Read More Posts
                </p>
            </div>
        </div>
    )
}

export default RecentPosts