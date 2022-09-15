import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/LoginSingup.scss'


const LoginPage = ({ onLogin }) => {
  // const [username, setUsername] = useState('')
  // let navigate = useNavigate
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  // const [isLogin, setIsLogin] = useState(false)
  // const [errors, setErrors] = useState([])
  // const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      'email': email,
      'password': password
    }
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => onLogin(user))
        // setIsLogin(true)
        console.log(formData)
      }
    })
    // .then(res => res.json())
    // .then(user => onLogin(user))
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={e => handleSubmit(e)}>
        <div className="form-header">
          <h1>Log in</h1>
        </div>
        <input
          value={email}
          onChange={handleEmailChange}
          type='text'
          placeholder="Email"
        />
        <input
          value={password}
          onChange={handlePasswordChange}
          type='password'
          placeholder="Password"
        />
        <button> Submit </button>
      </form>
      <div className="redirect-text">
        <p> Don't have an account? <Link to='/signup'>Signup</Link> </p>
      </div>
    </div>
  )
}
export default LoginPage