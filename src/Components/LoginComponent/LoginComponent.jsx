import axios from 'axios'
import React,{ useState }  from 'react'
import './LoginComponent.css'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

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
                alert(`Welcome ${response.data.role}`)
                if(response.data.role == 'admin')
                {
                    navigate('/admin')
                }
                else if(response.data.role == 'hr')
                {
                    navigate('/hr')
                }
                else
                {
                    alert("Login in again")
                    navigate('/')
                }
            }
        })
        .catch((error)=>{
            console.log(error)
            alert(`Status : ${error}`)
        })
    }
  return (
    <React.Fragment>
        <div className='login-main-content'>
        <form className="login-form">
            <div className="mb-3">
                <label htmlFor="emailID">EmailID</label>
                <input 
                    type="text" 
                    placeholder="Enter the email ID"
                    id="emailID"
                    name="emailID"
                    value={emailID}
                    onChange={handleEmailID}
                />
            </div>

            <div className="mb-3">
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
    </React.Fragment>
  )
}

export default LoginComponent