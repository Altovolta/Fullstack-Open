const Part = ({name, exercises}) => {
    console.log("Name:", name, "| Exercises:", exercises)
    return (
        <p>
        {name} {exercises}
        </p>
    )
}

export default Part