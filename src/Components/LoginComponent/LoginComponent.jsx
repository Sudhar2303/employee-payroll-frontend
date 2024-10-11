import axios from 'axios'
import React,{ useState }  from 'react'
import './LoginComponent.css'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";


const LoginComponent = () => {
    const navigate = useNavigate();
    const [emailID, setEmailID] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailID =(event) =>{
        setEmailID(event.target.value)
    }
    const handlePassword =(event) =>{
        setPassword(event.target.value)
    }

    const handleRegistration =(event) =>
    {
        event.preventDefault()
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
                    //alert("Login in again")
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
  return (
    <React.Fragment>
        <div className='login-main-content'>
            <div className='title'>
                Employee Payroll
            </div>
            <form className="login-form">
                <div className='login-header'>
                    <p>Login</p>
                </div>
                <div className="login-container">
                    <label htmlFor="emailID">Email</label>
                    <input 
                        type="text" 
                        placeholder="Enter the email ID"
                        id="emailID"
                        name="emailID"
                        value={emailID}
                        onChange={handleEmailID}
                    />
                </div>
                <div className="login-container">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter the password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePassword}
                    />
                </div>
                <button onClick={handleRegistration}>Login</button>
            </form>
        </div>
        <ToastContainer />
    </React.Fragment>
  )
}

export default LoginComponent