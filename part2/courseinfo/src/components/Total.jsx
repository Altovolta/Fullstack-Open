const Total = ({parts}) => {
    console.log(parts)
    let total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <b>
        total of {total} exercises
      </b>
    )
}

export default Total