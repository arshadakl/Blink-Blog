import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { _createComment, _getComments } from '../utils/API/CommentApi';
import { handleError } from '../utils/API/errorHandler';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { DateFormater } from '../utils/DateFormater';
function CommentSection() {
    const [commands, setCommends] = useState()
    const { id } = useParams()
    const user = useSelector((state) => state.user.user)
    const [commentLength, setCommentLength] = useState(0);

    const validationSchema = Yup.object({
        content: Yup.string()
            .test(
                'no-only-spaces',
                'Comment must be 200 characters or less',
                value => value && value.replace(/\s+/g, '').length <= 200
            )
            .required('Comment is required'),
    });

    const fetchData = async () => {
        try {
            const response = await _getComments(id)
            if (response.status) {
                setCommends(response.comments)
            }
        } catch (error) {
            const errorMessage = handleError(error);
            toast.error(errorMessage)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            console.log(values);
            const response = await _createComment(id, values)
            if (response.status) {
                setCommends(response.comments)
                toast.success(response.message)
            }
            console.log(values);
            setSubmitting(false);
            resetForm();
            setCommentLength(0);
        } catch (error) {
            const errorMessage = handleError(error);
            toast.error(errorMessage);
        }
    };

    return (
        <div>
            <section className="  py-8 lg:py-4 antialiased">
                <div className="max-w-2xl px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                            Comments
                        </h2>
                    </div>
                    {user?.username &&

                        <Formik
                            initialValues={{ content: '' }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, handleChange, values }) => (
                                <Form className="mb-6">
                                    <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg border bg-B1 border-gray-700">
                                        <label htmlFor="comment" className="sr-only">
                                            Your comment
                                        </label>
                                        <Field
                                            as="textarea"
                                            id="content"
                                            name="content"
                                            rows={3}
                                            className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none text-white dark:placeholder-gray-400 bg-B1"
                                            placeholder="Write a comment..."
                                            onChange={(e) => {
                                                handleChange(e);
                                                setCommentLength(e.target.value.replace(/\s+/g, '').length);
                                            }}
                                        />
                                        <ErrorMessage name="comment" component="div" className="text-red-500 text-xs mt-1" />
                                        <p className="text-end text-gray-400 text-[12px] italic">{commentLength} / 200 max</p>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-B1/80 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-B1"
                                    >
                                        Post comment
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    }
                    {commands?.map((commend) => {
                        return (
                            <article className="p-6 text-base my-3 rounded-lg bg-B1">
                                <footer className="flex justify-between items-center mb-2">
                                    <div className="flex items-center">
                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                            {commend?.profileURL ? <img
                                                className="mr-2 w-6 h-6 rounded-full"
                                                src={commend?.profileURL}
                                                alt="user img"
                                            /> :

                                                <div className='bg-[#121212] rounded-full mx-2 p-1 text-center'>

                                                    <button className='bg-green-100 font-bold text-[#121212]  rounded-full mx-auto  w-6 text-center h-6 uppercase'>
                                                        {commend?.username[0]}
                                                    </button>
                                                </div>
                                            }
                                            {commend?.username}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            <time pubdate="" dateTime="2022-02-08" title="February 8th, 2022">
                                                {DateFormater(commend?.created_at)}
                                            </time>
                                        </p>
                                    </div>

                                </footer>
                                <p className="text-gray-500 dark:text-gray-400">
                                    {commend.content}
                                </p>
                            </article>
                        )
                    })}


                </div>
            </section>

        </div>
    )
}

export default CommentSection
