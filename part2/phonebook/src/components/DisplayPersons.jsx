import Person from "./Person"

const DisplayPersons = ({persons, filterValue}) => {

    const personsFiltered = persons.filter(person => person.name.includes(filterValue))

    return (
        <>
        {personsFiltered.map(person => <Person key={person.id} name={person.name} phone={person.number}/>)}
        </>
    )
}

export default DisplayPersons