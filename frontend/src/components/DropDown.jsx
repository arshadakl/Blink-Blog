import { initFlowbite } from 'flowbite'
import React, { useEffect } from 'react'
import { clearUser } from '../redux/userSlice';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { _logout } from '../utils/API/AuthApi';
import { handleError } from '../utils/API/errorHandler';
import { IoAdd } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function DropDown() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user);
    useEffect(() => {
        initFlowbite()
    }, [])

    const handleLogout = async () => {
        try {
            const response = await _logout()
            if (response.status) {
                dispatch(clearUser())
                toast.success(response.message)
            }
        } catch (error) {
            const errorMessage = handleError(error);
            toast.error(errorMessage)
        }
    }

    return (
        <>
            <>
                <button
                    id="dropdownAvatarNameButton"
                    data-dropdown-toggle="dropdownAvatarName"
                    className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
                    type="button"
                >
                    <span className="sr-only">Open user menu</span>
                    {user.profileURL ? <img
                        className="w-8 h-8 me-2 rounded-full"
                        src={user.profileURL}
                        alt="user photo"
                    /> :
                        <div className='bg-[#121212] rounded-full mx-auto p-1 text-center'>

                            <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" className='bg-green-100 font-F2 font-bold text-[#121212]  rounded-full mx-auto p-1 w-8 text-center h-8 uppercase'>
                                {user?.username[0]}
                            </button>
                        </div>
                    }
                    {user?.username}
                    <svg
                        className="w-2.5 h-2.5 ms-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>
                {/* Dropdown menu */}
                <div
                    id="dropdownAvatarName"
                    className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                >
                    <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div onClick={()=>navigate('/profile')} className="font-medium cursor-pointer">My Profile</div>
                    </div>



                    <div className="py-2">
                        <p onClick={()=>navigate('/newpost')}
                            className="flex px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Create New Post 
                        </p>
                    </div>
                    <div className="py-2">
                        <p onClick={handleLogout}
                            className="block px-4 cursor-pointer py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                            Sign out
                        </p>
                    </div>
                </div>
            </>

        </>
    )
}

export default DropDown
