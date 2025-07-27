import Person from "./Person"

const DisplayPersons = ({persons, filterValue}) => {

    const personsFiltered = persons.filter(person => person.name.includes(filterValue))

    return (
        <>
        {personsFiltered.map((person, index) => <Person key={index} name={person.name} phone={person.phone}/>)}
        </>
    )
}

export default DisplayPersons