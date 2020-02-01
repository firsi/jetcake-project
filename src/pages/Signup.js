import React, { useState } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import app, {storage, db} from '../base';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useCurrentUserValue } from '../context/Auth-context';
import { Select } from '../components/Select';
import { isFileSupported, generateRandomString } from '../util';

const Signup = ({history}) => {
    const {currentUser} = useCurrentUserValue();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [activeAnswer,setActiveAnswer] = useState(false);
    const [dbErrors, setDbErrors] = useState();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if(file){
            !isFileSupported(file) && formik.setFieldError('picture', 'Unsupported file format');
            setImage(file);
        }
    }

    const handleImageUpload = () => {
        const uploadTask =  storage.ref().child('profiles/' + generateRandomString(10)).put(image);
        return new Promise( resolve => {
            uploadTask.on("state_changed",
                () => {},

                error => console.log(error),

                () => {
                    uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(downloadUrl => {
                        resolve(downloadUrl);
                    })
                }
            )
        })  
    }

    const handleSelect = (event) => {
        formik.setFieldValue('question', event.target.value);
        if(event.target.value === ""){
            setActiveAnswer(false);
        }
        else{
            setActiveAnswer(true);
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
            date: "",
            phone: "",
            address: "", 
            question: "",
            answer: "",
            picture: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                    .email('Please, enter a valid email')
                    .required('This field is required'),
            password: Yup.string()
                        .min(8, 'The password should contain at least 8 characters')
                        .required('This field is required'),
            confirmPassword: Yup.string()
                                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                                .required('This field is required'),
            date: Yup.date()
                    .max(new Date(), 'Your date of birth should be lesser than today\'s date')
                    .required('This field is required'),
            phone: Yup.string()
                    .test('isNumber', 
                         'Please enter a valid phone number',
                         value => !(/[A-Za-z]/.test(value))
                         )
                    .required('This field is required'),
            address: Yup.string()
                        .required('This field is required'),
            question: Yup.string()
                        .oneOf([
                            "What is your oldest cousin’s first name?",
                            "What is the title of your favorite song?",
                            "In what city or town did your mother and father meet?"
                        ],'Invalid choice')
                        .required('This field is required'),
            answer: Yup.string()
                        .required('This field is required'),
            
        }),
        onSubmit: values => {
                setLoading(true);
                app.auth()
                    .createUserWithEmailAndPassword(values.email, values.password)
                    .then(userCredential => {
                       return handleImageUpload()
                        .then(imageUrl => {
                            return db.collection('users')
                            .add({
                                userId: userCredential.user.uid,
                                email: values.email,
                                date: values.date,
                                phone: values.phone,
                                address: values.address,
                                profileUrl: imageUrl,
                                question: values.question,
                                answer: values.answer
                            })
                            .catch(error => console.log(error));
                        })
                    })
                    .then(() => {
                        setLoading(false);
                        history.push('/profile');
                    })
                    .catch(error => {
                        setDbErrors(error.message);
                        setLoading(false);
                    })

          },
    });

    
    if(currentUser){
        return <Redirect to="/" />
    }
        return(
            <div className="form-container">
                <h1>Sign up</h1>
                <form onSubmit={formik.handleSubmit}>
                    {dbErrors ? 
                        <div className="error">{dbErrors}</div> : null}
                    <Input 
                        type="email" 
                        name="email" 
                        aria-label="Enter your email"
                        placeholder="Enter your email" 
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? 
                        <div className="error">{formik.errors.email}</div>
                        : null}
                    <Input 
                        type="password" 
                        name="password" 
                        aria-label="Enter your password"
                        placeholder="Enter your password" 
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? 
                        <div className="error">{formik.errors.password}</div>
                        : null}
                    <Input 
                        type="password" 
                        name="confirmPassword" 
                        aria-label="Confirm your password"
                        placeholder="Confirm your password" 
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? 
                        <div className="error">{formik.errors.confirmPassword}</div>
                        : null}

                        <Input 
                        type="date" 
                        name="date" 
                        aria-label="Enter your Date of Birth"
                        placeholder="Enter your Date of Birth" 
                        value={formik.values.date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.date && formik.errors.date ? 
                        <div className="error">{formik.errors.date}</div>
                        : null}
                    
                    <Input 
                        type="tel" 
                        name="phone" 
                        aria-label="Enter your phone number"
                        placeholder="Enter your phone number" 
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.phone && formik.errors.phone ? 
                        <div className="error">{formik.errors.phone}</div>
                        : null}
                    <Input 
                        type="text" 
                        name="address" 
                        aria-label="Enter your address"
                        placeholder="Enter your address" 
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.address && formik.errors.address ? 
                        <div className="error">{formik.errors.address}</div>
                        : null}
                     <Input 
                        type="file" 
                        name="picture" 
                        aria-label="Select a profile picture" 
                        onChange={handleImageChange}
                        onBlur={formik.handleBlur}
                        
                    />     
                    {formik.touched.picture && formik.errors.picture ? 
                        <div className="error" >{formik.errors.picture}</div>
                        : null}
                    <Select 
                        name="question"
                        onChange={handleSelect}
                        value={formik.values.question}
                        onBlur={formik.handleBlur}
                        >
                        <option value="">Select a security question</option>
                        <option value="What is your oldest cousin’s first name?">What is your oldest cousin’s first name?</option>
                        <option value="What is the title of your favorite song?">What is the title of your favorite song?</option>
                        <option value="In what city or town did your mother and father meet?">In what city or town did your mother and father meet?</option>    
                    </Select>
                    {formik.touched.question && formik.errors.question ? 
                        <div className="error" style={{marginTop:"2em"}}>{formik.errors.question}</div>
                        : null}
                    <Input 
                        type="text" 
                        name="answer" 
                        aria-label="Enter your answer"
                        placeholder="Enter your answer" 
                        value={formik.values.answer}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!activeAnswer}
                    />
                    {formik.touched.answer && formik.errors.answer ? 
                        <div className="error">{formik.errors.answer}</div>
                        : null}
                    <Button type="submit" disabled={loading} >Sign up</Button>

                </form>
                <div className="additional-info">
                    <Link to="/signin" className="new-account">Already member? Sign in</Link>
                </div>
            </div>
        ) 
}

export default withRouter(Signup);