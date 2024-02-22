import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePet = () => {
    const [breed, setBreed] = useState()
    const [type, setType] = useState()
    const [createdBy, setCreatedBy] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        axios.post("http://localhost:4000/createPet", {breed, type, created_by: createdBy})
        .then((res) => {
            console.log(res)
            navigate('/')
        })
        .catch((err) => {
          console.log(err)
          setError(err.response.data)
        })
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add Pet</h2>
        <div>
            <label htmlFor='breed'>Breed</label>
            <input type='text' id='breed' placeholder='Enter Breed Name' onChange={(e) => setBreed(e.target.value)} />
        </div>
        <div>
            <label htmlFor='type'>Type</label>
            <input type='text' id='type' placeholder='Enter Breed Type' onChange={(e) => setType(e.target.value)} />
        </div>
        <div>
          <label htmlFor='createdBy'>Created By</label>
          <input type='text' id='createdBy' placeholder='Enter username' onChange={(e) => setCreatedBy(e.target.value)} />
        </div>
        <button>Submit</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default CreatePet;
