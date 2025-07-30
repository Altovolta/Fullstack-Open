const Person = ({id, name, phone, deletionHandler}) => {
    return (
        <p> 
            {name} {phone}  
            <button onClick={() => deletionHandler(id, name)}>delete</button> 
        </p>  

    )
}

export default Person