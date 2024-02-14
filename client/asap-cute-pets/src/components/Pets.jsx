import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";

const Pets = () => {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/pets")
      .then((pets) => {
        console.log(pets.data);
        setPets(pets.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete("http://localhost:4000/deletePet/" + id)
    .then(res => {
      console.log(res)
      window.location.reload()
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      {console.log(pets)}
      <h1>Welcome to Adorable Pet Breeds!</h1>
      <p>Discover the most adorable pet breeds that will melt your heart.</p>
      <Link to="/createPet">
        <button>Add +</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Breed</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            pets.map((eachPet) => {
              return(
                <tr>
                  <td>{eachPet.breed}</td>
                  <td>{eachPet.type}</td>
                  <td>
                    <Link to={`/updatePet/${eachPet._id}`}><button>Edit</button></Link>
                    <button onClick={(e) => handleDelete(eachPet._id)}>Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};
export default Pets;
