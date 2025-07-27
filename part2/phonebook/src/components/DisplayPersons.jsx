import Person from "./Person"

const DisplayPersons = ({persons}) => {
    return (
        <>
        {persons.map((person, index) => <Person key={index} name={person.name} phone={person.phone}/>)}
        </>
    )
}

export default DisplayPersons