import Person from "./Person"

const Persons = ({persons, filterValue}) => {

    const personsFiltered = persons.filter(person => person.name.includes(filterValue))

    return (
        <>
        {personsFiltered.map(person => <Person key={person.id} name={person.name} phone={person.number}/>)}
        </>
    )
}

export default Persons