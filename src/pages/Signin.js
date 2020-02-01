import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import  * as yup from 'yup';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import './signin.css';
import app from '../base';
import { useCurrentUserValue } from '../context/Auth-context';

const Signin = ({history}) => {
    const [dbErrors, setDbErrors] = useState();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: yup.object({
            email: yup.string()
                    .email('Please, Enter a valid email')
                    .required('Email is required'),
            password: yup.string()
                        .min(8, 'Password shouldn\'t be lesser than 8 characters')
                        .required('Password is required')
        }),

        onSubmit: values => {
            app.auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .then(() => {
                    history.push('/profile');
                })
                .catch(error => {
                    setDbErrors(error.message);
                });
        }
    });

    const {currentUser} = useCurrentUserValue();
    if(currentUser){
       return <Redirect to="/" />
    }
        return(
            <div className="form-container">
                <h1>Sign in</h1>
                <form onSubmit={formik.handleSubmit}>
                {dbErrors ? 
                        <div className="error">{dbErrors}</div> : null}
                    <Input 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        aria-label="Enter your email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.email ? 
                        <div className="error">{formik.errors.email}</div> : null}
                    <Input 
                        type="password" 
                        name="password"
                        aria-label="Enter your password" 
                        placeholder="Enter your password" 
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.password ? 
                        <div className="error">{formik.errors.password}</div> : null}
                    <Button type="submit">Sign In</Button>
                </form>
                <div className="additional-info">
                    <Link to="/signup" className="new-account">Create new Account</Link>
                </div>
            </div>
        )
    
}

export default withRouter(Signin);