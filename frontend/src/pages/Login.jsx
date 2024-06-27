import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { _login } from '../utils/API/AuthApi';
import { toast } from 'sonner';
import { handleError } from '../utils/API/errorHandler';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import LogoButton from '../components/LogoButton';
import Loading from '../components/Loading';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isLoading,setIsLoading] = useState(false)

    // Validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    // Form submission handler
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setIsLoading(true)
            const response = await _login(values)
            setIsLoading(false)
            if (response.status) {
                console.log(response.user);
                dispatch(setUser(response.user));
                toast.success(response.message)
                navigate('/');
            }
        } catch (error) {
            const errorMessage = handleError(error);
            toast.error(errorMessage)
        }
    };

    return (
        <section>
            <LogoButton />
            {isLoading && <Loading/>}
            <div className="grid md:h-screen  md:grid-cols-2">
                <div className="flex flex-col items-center justify-center bg-white">
                    <div className="max-w-lg px-5 py-16 text-center md:px-10 md:py-24 lg:py-32">
                        <h2 className="mb-5 text-3xl md:mb-6 md:text-4xl font-semibold font-blink">
                            Enter the <br /> Future with Blink;
                        </h2>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="mx-auto mb-4 max-w-sm pb-4">
                                    <div className="relative mb-4">
                                        <img
                                            alt=""
                                            src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f190b7e37f878_EnvelopeSimple.svg"
                                            className="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
                                        />
                                        <Field
                                            type="email"
                                            name="email"
                                            className="mb-4 block h-9 w-full border border-black bg-[#f2f2f7] px-3 py-6 pl-14 text-sm text-[#333333]"
                                            placeholder="Email Address"
                                            required
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-start text-xs" />
                                    </div>
                                    <div className="relative mb-4">
                                        <img
                                            alt=""
                                            src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f19601037f879_Lock-2.svg"
                                            className="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block"
                                        />
                                        <Field
                                            type="password"
                                            name="password"
                                            className="mb-4 block h-9 w-full border border-black bg-[#f2f2f7] px-3 py-6 pl-14 text-sm text-[#333333]"
                                            placeholder="Password (min 8 characters)"
                                            required
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-start text-xs" />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex items-center w-full justify-center bg-gray-900 px-8 py-4 text-center font-semibold text-white transition [box-shadow:rgb(125,125,125)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px]"
                                    >
                                        <p className="mr-6 font-bold">Login Now</p>
                                        <svg
                                            className="h-4 w-4 flex-none"
                                            fill="currentColor"
                                            viewBox="0 0 20 21"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <title>Arrow Right</title>
                                            <polygon points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9" />
                                        </svg>
                                    </button>
                                </Form>
                            )}
                        </Formik>
                        <p className="text-sm text-[#636262]">
                            Don't have an account?
                            <span onClick={() => navigate('/signup')} className="cursor-pointer text-sm font-bold text-black">
                                {" "}SignUp
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center bg-[#f2f2f7]">
                    <div className="max-w-lg px-5 py-16 md:px-10 md:py-24 lg:py-32">
                        <div className="mb-6 ml-2 flex h-14 w-14 items-center justify-center bg-gray-800 [box-shadow:rgb(125,125,125)_-8px_8px]">
                            <img
                                src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f5ec37c8c32b17d1c725_Vector-9.svg"
                                alt=""
                                className="inline-block"
                            />
                        </div>
                        <p className="mb-8 text-[#647084]  font-blink font-medium md:mb-10 lg:mb-6">
                            The accelerating pace of technology will take us to the future faster than you can imagine.
                        </p>
                        <p className="font-semibold font-blink">Ray Kurzweil</p>
                        <p className="text-sm font-blink">inventor</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
