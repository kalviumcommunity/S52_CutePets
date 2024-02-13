import { useEffect, useState } from "react";
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
  return (
    <div>
      {console.log(pets)}
      <h1>Welcome to Adorable Pet Breeds!</h1>
      <p>Discover the most adorable pet breeds that will melt your heart.</p>
      <ul>
        {pets && pets.map((eachPet) => {
          return (
            <li key={eachPet.id}>
              <h2>{eachPet.breed} - {eachPet.type}</h2>
              <p>{eachPet.characteristics.map((eachChar) => (<p>{eachChar}</p>))}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default Pets;
