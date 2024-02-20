import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePet = () => {
    const {id} = useParams()
    const [breed, setBreed] = useState()
    const [error, setError] = useState()
    const [type, setType] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:4000/getPet/" + id)
        .then(res => {
            console.log(res)
            setBreed(res.data.breed)
            setType(res.data.type)
        })
        .catch(err => console.log(err))
    }, [])

    const handleUpdate = (e) => {
        e.preventDefault()
        setError('')
        axios.put("http://localhost:4000/updatePet/" + id, {breed, type})
        .then((res) => {
            console.log(res)
            navigate("/")
        })
        .catch(err => {
          console.log(err)
          setError(err.response.data)
        })
    }

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <h2>Update Pet</h2>
        <div>
            <label htmlFor='breed'>Breed</label>
            <input type='text' id='breed' placeholder='Enter Breed Name' value={breed} onChange={(e) => setBreed(e.target.value)} />
        </div>
        <div>
            <label htmlFor='type'>Type</label>
            <input type='text' id='type' placeholder='Enter Breed Type' value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <button>Submit</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default UpdatePet;
