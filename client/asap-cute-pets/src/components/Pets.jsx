import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Pets = () => {
  const jwtToken = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (jwtToken === undefined) {
      navigate("/login");
    }
  }, [jwtToken, navigate]);

  const [pets, setPets] = useState([]);
  const [displayedPets, setDisplayedPets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/pets")
      .then((response) => {
        setPets(response.data);
        setDisplayedPets(response.data); 
        const uniqueUsers = [...new Set(response.data.map(pet => pet.created_by))];
        setUsers(uniqueUsers);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/deletePet/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handleLogout = () => {
    Cookies.remove('token');
    navigate("/login");
  };

  const handleUserChange = (event) => {
    const selectedUser = event.target.value;
    if (selectedUser === "All") {
      setDisplayedPets(pets); 
    } else {
      const filteredList = pets.filter(eachPet => eachPet.created_by === selectedUser);
      setDisplayedPets(filteredList);
    }
  };

  return (
    <div>
      <h1>Welcome to Adorable Pet Breeds!</h1>
      <p>Discover the most adorable pet breeds that will melt your heart.</p>
      <select onChange={handleUserChange}>
        <option value="All">All Users</option>
        {users.map((user, index) => (
          <option key={index} value={user}>{user}</option>
        ))}
      </select>
      <Link to="/createPet">
        <button>Add +</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
      <table>
        <thead>
          <tr>
            <th>Breed</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedPets.map((eachPet) => (
            <tr key={eachPet._id}>
              <td>{eachPet.breed}</td>
              <td>{eachPet.type}</td>
              <td>
                <Link to={`/updatePet/${eachPet._id}`}><button>Edit</button></Link>
                <button onClick={() => handleDelete(eachPet._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Pets;
