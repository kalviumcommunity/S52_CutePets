import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.username = username ? "" : "Username is required.";
    tempErrors.email = email ? (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email) ? "" : "Email is not valid.") : "Email is required.";
    tempErrors.password = password ? (password.length >= 6 ? "" : "Password must be at least 6 characters long.") : "Password is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    Axios.post("http://localhost:4000/auth/signup", {
      username,
      email,
      password
    }).then((response) => {
      if (response.data.status) {
        navigate("/login");
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input type='text' onChange={(e) => setUsername(e.target.value)} />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
        <label htmlFor='email'>Email</label>
        <input type='email' onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        <label htmlFor='password'>Password</label>
        <input type='password' onChange={(e) => setPassword(e.target.value)} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        <button type='submit'>Sign Up</button>
        <p>Have an Account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default SignUp;
