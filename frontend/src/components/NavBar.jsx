import { initFlowbite } from 'flowbite'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { handleError } from '../utils/API/errorHandler';
import { toast } from 'sonner';
import { _logout } from '../utils/API/AuthApi';
import { clearUser } from '../redux/userSlice';
import DropDown from './DropDown';

function NavBar() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user);
    console.log("user :" + user.username);
    const navigate = useNavigate()
    useEffect(() => {
        initFlowbite()
    }, [])



    return (
        <>
            <nav className=" border-gray-200 bg-B1">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <p className='text-white font-blink text-3xl cursor-pointer' onClick={()=>navigate('/')}>Blink</p>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto font-blink font-normal" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  bg-B1 dark:border-gray-700">
                            <li className=' my-auto'>
                                <p
                                    onClick={() => navigate('/')} className="block cursor-pointer py-2 px-3 text-whiterounded md:bg-transparent md:p-0 dark:text-white hover:text-gray-400"
                                >
                                    Home
                                </p>
                            </li >

                            {!user.username &&
                                // <li className='my-auto'>
                                //     <p onClick={() => navigate('/newpost')}
                                //         className=" flex cursor-pointer py-2 px-3 text-whiterounded md:bg-transparent md:p-0 dark:text-white hover:text-gray-400"
                                //     > <IoAdd size={25} /> New Post</p>
                                // </li> :

                                <li className='my-auto'>
                                    <p onClick={() => navigate('/login')}
                                        className="block  cursor-pointer py-2 px-3 text-whiterounded md:bg-transparent md:p-0 dark:text-white hover:text-gray-400"
                                    >Login</p>
                                </li>
                            }
                            <li className='my-auto'>
                                {user.username ?
                                    <DropDown /> :
                                    
                                    <button onClick={() => navigate('/signup')} type="button" class="py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100  focus:z-10 focus:ring-4  bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Join Us</button>
                                }
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default NavBar
