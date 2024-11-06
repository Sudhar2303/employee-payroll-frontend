import axios from 'axios'
import React,{ useState }  from 'react'
import './LoginComponent.css'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { KeyRound } from 'lucide-react';

const LoginComponent = () => {
    const navigate = useNavigate();
    const [emailID, setEmailID] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showCredentials, setShowCredentials] = useState(false);

    const handleEmailID =(event) =>{
        setEmailID(event.target.value)
        setEmailError('');
    }
    const handlePassword =(event) =>{
        setPassword(event.target.value)
        setPasswordError('');
    }
    const validateEmail = (email) => 
    {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const handleRegistration =(event) =>
    {
        event.preventDefault()
        let isValid = true;

        if (!emailID) 
        {
            setEmailError('Email is required');
            isValid = false;
        } 
        else if (!validateEmail(emailID)) 
        {
            setEmailError('Please enter a valid email');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        }
        if (isValid) 
        {
            axios
            .post(`https://employee-payroll-backend.vercel.app/api/v1/login`,
            {
                emailID:emailID,
                password:password
            }, {withCredentials: true}
            )
            .then((response)=>
            {
            if(response.status==201)
                {
                    window.localStorage.setItem('token',response.data.token)
                    if(response.data.role == 'admin')
                    {
                        navigate('/admin')
                    }
                    else if(response.data.role == 'hr')
                    {
                        navigate('/hr')
                        toast.success(`Welcome hr`, 
                        {
                            position: "bottom-right",
                            autoClose: 3000,
                        })
                    }
                    else
                    {
                        toast.error(`Login in again`, 
                        {
                            position: "bottom-right",
                            autoClose: 3000,
                        })
                    }
                }
            })
            .catch((error)=>{
                console.log(error)
                toast.error(`${error.response.data.message}`, {
                    position: "bottom-right",
                    autoClose: 3000,
                })
            })
        }
    }
  return (
    <React.Fragment>
        <div className='login-main-content'>
            <div className='title'>
                Payroll Management
                <div className='login-credentials'> 
                    <div className='credentials-header' onClick={() => setShowCredentials(!showCredentials)}>
                        <KeyRound className='key-icon'/>
                        <p>login credentials</p>
                    </div>
                    { showCredentials && <div className='credentials'>
                        <div className='login-data'>
                            <p className='field-header'>For Admin Login</p>
                            <div className='credentials-field'>
                                <p>Email-ID :</p>
                                <p className='field-value'>admin123@gmail.com</p>
                            </div>
                            <div className='credentials-field'> 
                                <p >Password :</p>
                                <p className='field-value'>12345</p>
                        </div>
                        </div>
                        <div>
                            <p className='field-header'>For HR Login</p>
                            <div className='credentials-field'>
                                <p>Email-ID :</p>
                                <p className='field-value'>hr123@gmail.com</p>
                            </div>
                            <div className='credentials-field'>
                                <p>Password :</p>
                                <p className='field-value'>12345</p>
                            </div>
                        </div>
                    </div> }
                </div>
            </div>
            <form className="login-form">
                <div className='login-header'>
                    <p>Login</p>
                </div>
                <div className="login-container">
                    <label htmlFor="emailID">Email</label>
                    <input 
                        type="text" 
                        id="emailID"
                        name="emailID"
                        value={emailID}
                        onChange={handleEmailID}
                        autoComplete="off" 
                    />
                    {emailError && <p className="form-error-message">{emailError}</p>}
                </div>
                <div className="login-container">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePassword}
                        autoComplete="off" 
                    />
                    {passwordError && <p className="form-error-message">{passwordError}</p>}
                </div>
                <button onClick={handleRegistration}>Login</button>
            </form>
        </div>
    </React.Fragment>
  )
}

export default LoginComponent