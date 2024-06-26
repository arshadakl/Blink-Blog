import React, { useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { _createPost } from '../utils/API/BlogApi';
import { handleError } from '../utils/API/errorHandler';
import { toast } from 'sonner';

function CreatePostForm() {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        if (image) {
            setImage(null);
        } else {
            fileInputRef.current.click();
        }
    };



    // Validation schema using Yup with custom space validation
    const validationSchema = Yup.object({
        title: Yup.string()
            .test(
                'no-only-spaces',
                'Title must be at least 10 characters ',
                value => value && value.trim().length >= 10
            )
            .max(80, 'Title must be 80 characters or less ')
            .required('Title is required'),
        content: Yup.string()
            .test(
                'no-only-spaces',
                'Content must be at least 150 characters ',
                value => value && value.trim().length >= 150
            )
            .required('Content is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('content', values.content);

            if (image) {
                // Convert base64 image to file
                const imageFile = await fetch(image).then(res => res.blob());
                formData.append('image', imageFile, 'blog_image.jpg');
            }
            console.log(values);
            const response = await _createPost(formData)
            if (response.status) {
                toast.success(response.message)
                // navigate('/');
                setSubmitting(false);
            }
        } catch (error) {
            const errorMessage = handleError(error);
            toast.error(errorMessage)
        }
    };

    return (
        <div className="flex justify-center items-start font-blink py-10 bg-gradient-to-t  min-h-screen max-h-full w-full">
            <div className='md:w-5/6 w-11/12 bg-B1/80 min-h-96 max-h-full rounded-md'>
                <div className='mx-10 my-4'>
                    <p className='font-blink font-medium text-white text-2xl'>Create New Blog</p>
                </div>
                <Formik
                    initialValues={{ title: '', content: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="title"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Title
                                    </label>
                                    <Field
                                        as="textarea"
                                        id="title"
                                        name="title"
                                        rows={2}
                                        className="block p-2.5 w-full text-3xl  rounded-lg border bg-gray-600/20 border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write Blog Title"
                                    />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-xs" />
                                </div>
                                <div className='col-span-2'>
                                    <div className="flex flex-col items-center">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                        {image && (
                                            <div className="mt-4 w-full h-96 m-2 bg-red-500 rounded-sm">
                                                <img src={image} alt="Preview" className="object-cover min-h-80 h-96 w-full" />
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            onClick={handleButtonClick}
                                            className="px-4 py-2 text-gray-900 font-semibold inline-flex items-center bg-green-100/90 hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm text-center"
                                        >
                                            {image ? 'Remove Image' : 'Add Blog Image'}
                                        </button>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="content"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Content
                                    </label>
                                    <Field
                                        as="textarea"
                                        id="content"
                                        name="content"
                                        rows={8}
                                        className="block p-2.5 w-full text-md  rounded-lg border bg-gray-600/20 border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write Blog Content"
                                    />
                                    <ErrorMessage name="content" component="div" className="text-red-500 text-xs" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="text-gray-900 font-semibold inline-flex items-center bg-green-100/90 hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                <svg
                                    className="me-1 -ms-1 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Create Post
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default CreatePostForm;
