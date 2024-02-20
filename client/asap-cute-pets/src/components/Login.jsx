import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); 

  const navigate = useNavigate();
  Axios.defaults.withCredentials = true;

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.email = email ? (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) ? "" : "Email is not valid.") : "Email is required.";
    tempErrors.password = password ? (password.length >= 6 ? "" : "Password must be at least 6 characters long.") : "Password is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return; 
    Axios.post("http://localhost:4000/auth/login", {
      email,
      password
    }).then((response) => {
      if(response.data.status === true) {
        Cookies.set("token", response.data.token, {expires: 30});
        navigate("/");
      }else{
        setErrors({ login: response.data.message });
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        <label htmlFor='password'>Password</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        <button type='submit'>Login</button>
        {errors.login && <p style={{ color: 'red' }}>{errors.login}</p>}
        <p>Don't have an Account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
}

export default Login;
