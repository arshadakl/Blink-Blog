import React, { useEffect, useState } from 'react'
import { _getAllPost } from '../utils/API/BlogApi'
import { handleError } from '../utils/API/errorHandler'
import { toast } from 'sonner'
import { DateFormater } from '../utils/DateFormater'
import { ShortString } from '../utils/ShortString'
import { useNavigate } from 'react-router-dom'
import Recent from './skeleton/Recent'

function AllpostSection() {
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading,setLoading] = useState(true)
    const postsPerPage = 6;
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await _getAllPost(currentPage)
            if (response.status) {
                setPosts(response.posts)
                setPosts(response.posts);
                setCurrentPage(response.currentPage);
                setTotalPages(response.totalPages);
                setLoading(false)
            }
        } catch (error) {
            const errorMessage = handleError(error);
            toast.error(errorMessage)
        }
    }
    useEffect(() => {
        fetchData()
    }, [currentPage])


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="px-6 py-8">
            <div className="container mx-auto flex justify-between">
                <div className="w-full lg:w-11/12 mx-auto">
                    <div className="mt-6">
                        {loading ? 
                        <>
                        <Recent/>
                        <Recent/>
                        <Recent/>
                        <Recent/>
                        </>
                        :
                           posts && posts?.map((post) => {
                                return (
                                    <div  className="mx-auto my-2 max-w-6xl rounded-lg bg-B1/80 px-10 py-6 shadow-md">
                                        <div className="flex items-center justify-between">
                                            <span className="font-light text-gray-200">{DateFormater(post.created_at)}</span>
                                        </div>
                                        <div className="mt-2">
                                            <p onClick={()=>navigate(`/post/${post.postID}`)}
                                                className="text-2xl cursor-pointer font-bold text-slate-50 hover:underline"
                                            >
                                                {post.title}
                                            </p>
                                            <p className="mt-2 text-gray-50">
                                                {ShortString(post.content,200)}
                                            </p>
                                        </div>
                                        <div onClick={()=>navigate(`/post/${post.postID}`)} className="cursor-pointer mt-4 flex items-center justify-between">
                                            <p className="text-blue-500 hover:underline">
                                                Read more
                                            </p>
                                        </div>
                                    </div>
                                )
                            })
                        }



                        {/* pagenation */}
                        <div className='flex justify-end'>
                            <nav aria-label="Page navigation example">
                                <ul className="inline-flex -space-x-px text-sm">
                                    <li>
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight  border border-e-0  rounded-s-lg   bg-B1 border-gray-700 text-gray-400 hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Previous
                                        </button>
                                    </li>
                                    {[...Array(totalPages).keys()].map((num) => (
                                        <li key={num}>
                                            <button
                                                onClick={() => handlePageChange(num + 1)}
                                                className={`flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 ${num + 1 === currentPage
                                                        ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                                                        : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                                                    }`}
                                            >
                                                {num + 1}
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Next
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AllpostSection
