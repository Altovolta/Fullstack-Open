import Person from "./Person"

const Persons = ({persons, filterValue, deletionHandler}) => {

    const personsFiltered = persons.filter(person => person.name.includes(filterValue))

    return (
        <>
        {personsFiltered.map(person => <Person key={person.id} id={person.id} 
        name={person.name} phone={person.number} deletionHandler={deletionHandler}/>)}
        </>
    )
}

export default Persons