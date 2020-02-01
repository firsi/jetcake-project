import React,{ useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import  {storage, db} from '../base';
import { isFileSupported, generateRandomString} from '../util';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Select } from '../components/Select';
import { useCurrentUserValue } from '../context/Auth-context';
import './profile.css';


export const Profile = () => {
    const [image, setImage] = useState(null);
    const [localeImageUrl, setLocaleImageUrl] = useState(null);
    const [activeAnswer,setActiveAnswer] = useState(false);
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dbErrors, setDbErrors] = useState();
    const {currentUser} = useCurrentUserValue();

    const formik = useFormik({
        initialValues: {
            email:"",
            date: "",
            phone: "",
            address: "", 
            profileUrl: "",
            question: "",
            answer: "",
            picture: ""
        },
        validationSchema: Yup.object({
            date: Yup.date()
                    .max(new Date(), 'Your date of birth should be lesser than today\'s date'),
            phone: Yup.string()
                    .test('isNumber', 
                         'Please enter a valid phone number',
                         value => !(/[A-Za-z]/.test(value))
                         ),
                         question: Yup.string()
                         .oneOf([
                             "What is your oldest cousin’s first name?",
                             "What is the title of your favorite song?",
                             "In what city or town did your mother and father meet?"
                         ],'Invalid choice')
                         .required('This field is required'),
            address: Yup.string()
                .required('This field is required'),
             answer: Yup.string()
                         .required('This field is required'),
             picture: Yup.mixed().required('This field is required')
        }),
        onSubmit: values => {
                setLoading(true);
                if(image){
                    handleImageUpload()
                    .then(imageUrl => {
                    return db.collection('users')
                            .doc(formik.values.id)
                            .set({
                                userId: currentUser.uid,
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
                    .then(() => {
                        setLoading(false);
                        setEdit(false);
                    })
                    .catch(error => {
                        setDbErrors(error.message);
                        setLoading(false);
                    })
                }
                else{
                    return db.collection('users')
                            .doc(formik.values.id)
                            .set({
                                userId: currentUser.uid,
                                email: values.email,
                                date: values.date,
                                phone: values.phone,
                                address: values.address,
                                profileUrl: values.profileUrl,
                                question: values.question,
                                answer: values.answer
                            })
                            .then(() => {
                                setLoading(false);
                                setEdit(false);
                            })
                            .catch(error => {
                                setDbErrors(error.message);
                                setLoading(false);
                            })
                }
          },
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file){
            !isFileSupported(file) && formik.setFieldError('picture', 'Unsupported file format'); 
            setImage(file);
            setLocaleImageUrl(URL.createObjectURL(file));
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

    const handleEdit = () => {
        setEdit(!edit);
        if(!edit){
            setLocaleImageUrl("");
        }
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

    useEffect(() => {
        db.collection('users')
        .where('userId', '==', currentUser.uid)
        .get()
        .then(querySnapshot => {
            const user = querySnapshot.docs[0].data();
            console.log(user.question);
            formik.setValues({
                id: querySnapshot.docs[0].id,
                email: user.email,
                date: user.date,
                phone: user.phone,
                address: user.address,
                profileUrl: user.profileUrl,
                question: user.question,
                answer: user.answer
            })
        })
    },[]);

        return(
            <div className="profile-container">
                <h1>My Profile</h1>
                <div className="content">
                <div className="image-container">
                    <img 
                        src={localeImageUrl ? localeImageUrl : formik.values.profileUrl} 
                        alt="Profile" 
                    />
                    {edit && <Input 
                        type="file" 
                        name="picture" 
                        className="select-file"
                        onChange={handleImageChange}
                        onBlur={formik.handleBlur}
                    />}
                    {formik.touched.picture && formik.errors.picture ? 
                        <div className="error" style={{marginTop:"4em"}}>{formik.errors.picture}</div>
                        : null}
                    
                </div>
                <div className="form-container">
                <form onSubmit={formik.handleSubmit}>
                {dbErrors ? 
                        <div className="error">{dbErrors}</div> : null}
                    <label htmlFor="email">E-mail : </label>
                    <Input 
                        type="email" 
                        name="email" 
                        value={formik.values.email}
                        disabled
                    />
                    <label htmlFor="date">Date of Birth :</label>
                    <Input 
                    type="date" 
                    name="date" 
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!edit}
                    />
                    {formik.touched.date && formik.errors.date ? 
                        <div className="error">{formik.errors.date}</div>
                        : null}
                    <label htmlFor="phone">Phone Number: </label>
                    <Input 
                        type="tel" 
                        name="phone" 
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!edit}
                    />
                    {formik.touched.phone && formik.errors.phone ? 
                        <div className="error">{formik.errors.phone}</div>
                        : null}
                    <label htmlFor="address">Address : </label>
                    <Input 
                        type="text" 
                        name="address"  
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!edit}
                    />
                    {formik.touched.address && formik.errors.address ? 
                        <div className="error">{formik.errors.address}</div>
                        : null}
                    <label htmlFor="question">Security Question : </label>
                    <Select 
                        name="question"
                        onChange={handleSelect}
                        value={formik.values.question}
                        onBlur={formik.handleBlur}
                        disabled={!edit}
                        >
                        <option value="">Select a security question</option>
                        <option value="What is your oldest cousin’s first name?">What is your oldest cousin’s first name?</option>
                        <option value="What is the title of your favorite song?">What is the title of your favorite song?</option>
                        <option value="In what city or town did your mother and father meet?">In what city or town did your mother and father meet?</option>    
                    </Select>
                    {formik.touched.question && formik.errors.question ? 
                        <div className="error">{formik.errors.question}</div>
                        : null}
                    <label htmlFor="answer">Answer </label>
                    <Input 
                        type="text" 
                        name="answer" 
                        aria-label="Enter your answer"
                        placeholder="Enter your answer" 
                        value={formik.values.answer}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={edit ? !activeAnswer : true}
                    />
                    {formik.touched.answer && formik.errors.answer ? 
                        <div className="error">{formik.errors.answer}</div> : null}
                        
                    <div className="profile-buttons">
                        <Button type="button" onClick={handleEdit} width="150px" >
                            {edit ? "Cancel" : "Edit"}
                        </Button>
                        <Button type="submit" width="150px" disabled={loading} >Save changes</Button>
                    </div>

                </form>
            </div>
                </div>
            </div>
        ) 
}

