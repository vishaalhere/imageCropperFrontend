import React, { useState } from 'react'
import './register.css'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Register = ({ profile, setProfile, setProfilePreview }) => {
    const navigate = useNavigate();

    const validation = Yup.object({
        firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
    })

    const submitForm = async (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('profile', profile, profile.name)
        const resp = await registerUser(formData);
        if (resp.data.success) {
            toast.success("User Registered!");
            navigate('/crop');
        } else {
            toast.error("Failed to Register User!")
        }
    }

    const handleUpload = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfilePreview(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
        setProfile(e.target.files[0])
    }

    return (
        <div className='register-container'>
            <div className='register-box'>
                <h2 className='register-heading'>Register</h2>
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', profile: '' }}
                    validationSchema={validation}
                    onSubmit={submitForm}
                >
                    <Form encType="multipart/form-data">
                        <div className='input-box'>
                            {/* <label htmlFor="firstName">First Name</label> */}
                            <Field name="firstName" type="text" placeholder="Enter First Name" />
                            <ErrorMessage name="firstName">
                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <div className='input-box'>
                            {/* <label htmlFor="lastName">Last Name</label> */}
                            <Field name="lastName" type="text" placeholder="Enter Last Name" />
                            <ErrorMessage name="lastName">
                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <div className='input-box'>
                            {/* <label htmlFor="email">Email Address</label> */}
                            <Field name="email" type="email" placeholder="Enter Email Address" />
                            <ErrorMessage name="email">
                                {msg => <div style={{ color: 'red' }}>{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <div className='input-box'>
                            <label htmlFor="profile">Upload Profile Photo</label>
                            <input name="profile" type="file" accept="image/*" required size={60} onChange={handleUpload} />
                        </div>



                        <button className='submit-btn' type="submit">Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Register