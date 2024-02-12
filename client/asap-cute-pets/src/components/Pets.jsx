import data from './data.json'

const Pets = () => {
    return(
        <div>
            <h1>Welcome to Adorable Pet Breeds!</h1>
            <p>Discover the most adorable pet breeds that will melt your heart.</p>
            <ul>
                {
                    data.map((eachPet) => {
                        return(
                            <li key={eachPet.id}>
                                <h1>{eachPet.breed}</h1>
                                <p>{eachPet.type}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
export default Pets;