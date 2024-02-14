import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePet = () => {
    const [breed, setBreed] = useState()
    const [type, setType] = useState()
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/createPet", {breed, type})
        .then((res) => {
            console.log(res)
            navigate('/')
        })
        .catch((err) => console.log(err))
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
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CreatePet;
