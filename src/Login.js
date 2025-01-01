import React, { useState, useEffect, useRef} from 'react';
import {faCheck, faTimes, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Box,TextField, Button, Container, Typography, Paper } from '@mui/material';
import { blue } from '@mui/material/colors';
import AuthContext from './AuthContext';
import {Link, useNavigate} from 'react-router-dom';
import useAuth from './useAuth';

const Login = () => {
    const {setToken}= useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState('');
    const [successMessage,setSuccessMessage]=useState('');
    const [errorMessage,setErrorMessage]=useState('');

    const [showValidation, setShowValidation] = useState({
        email: false,
        password: false,
    });

    const navigate = useNavigate();


 /*  const validateName=(name)=>{
        const nameRegex=/^[A-Za-z\s]+$/;
        return nameRegex.test(name);
    }*/

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        console.log(password);
        const passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/;
        return passwordRegex.test(password);
    };

/*    const validateMobile=(mobileno)=>{
        const mobileRegex=  /^\d{10}$/;
        return mobileRegex.test(mobileno);
    }

    const validateAge=(age)=>{
        const ageRegex= /^(1[89]|[2-9]\d)$/;
        return ageRegex.test(age);
    }*/

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleFocus = (field) => {
        setShowValidation((prev) => ({ ...prev, [field]: true }));
    };

    const handleBlur = (field) => {
        setShowValidation((prev) => ({ ...prev, [field]: false }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, mobileno, age } = formData;

        let validationErrors = {};
        if (!validateEmail(email)) {
            validationErrors.email = 'Invalid email address';
        }
        if (!validatePassword(password)) {
            validationErrors.password = 'Password must be at least 8 characters long and contain at least one capital and small letter and one number';
        }
       /* if (!validateName(name)) {
            validationErrors.name = 'Name must contain only letters';
        }
        if (!validateMobile(mobileno)) {
            validationErrors.mobileno= 'Phone number must be only 10 digits';
        }
        if (!validateAge(age)) {
            validationErrors.age = 'Age must be a number greater or equal to 18';
        }*/
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('https://uc-fd-auth-backend.onrender.com/user/login', JSON.stringify({email, password}),
           { headers:{'Content-Type':'application/json'}}
        );
            console.log(response.data);
            const accessToken=response.data;
            setToken(accessToken);
            console.log(accessToken);
            setSuccessMessage('Login successful!');
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrorMessage('No account found with this email. Please sign up.');
            }
            else  if (error.response && error.response.status === 500) {
                setErrorMessage('Password is incorrect! Please try again.');
            }
            else{
            console.error('Login failed:', error.response);
            setErrorMessage('Login failed! Try again.');
        }
    }
    };

    return (
        <Box sx={{height:'100vh',backgroundImage:'url("https://static.vecteezy.com/system/resources/previews/015/679/685/non_2x/dark-pink-blue-gradient-blur-background-vector.jpg")', backgroundSize:'cover', padding: 4}}>
        <Container maxWidth="xs" sx={{ mt:4, mb:4, paddingBottom:5, borderRadius:10 ,boxShadow: '2px 2px #9ea1a3 inset',display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',backgroundImage:'radial-gradient(#d8d8da,#fefefe)', backdropFilter:'blur(5px)'}}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mt:'20px', color:'#0618ea', fontWeight:600, textAlign:'center'}}>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    name="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={() => handleBlur('email')}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                 {showValidation.email && (
                        <Typography variant="caption" color="text.secondary">
                            Please enter a valid email address.
                        </Typography>
                    )}
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={() => handleBlur('password')}
                    error={!!errors.password}
                    helperText={errors.password}
                />
                  {showValidation.password && (
                        <Typography variant="caption" color="text.secondary">
                            Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.
                        </Typography>
                    )}
               
                <Button type="submit" variant="contained" color="primary" sx={{marginTop:2, marginLeft:20}}>
                    Log In
                </Button>
            </form>
            {successMessage&&(
                <Typography variant="body1" color="success.main" sx={{marginTop:2}}>
                    {successMessage}
                </Typography>
            )}
            {errorMessage&&(
                 <Typography variant="body1" color="error.main" sx={{marginTop:2}}>
                 {errorMessage}
             </Typography>
            )}
             <Typography variant="body2" sx={{ marginTop: 2 }}>
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </Typography>
        </Container>
        </Box>
    );
};

export default Login;