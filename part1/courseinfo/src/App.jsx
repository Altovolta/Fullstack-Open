const Header = (props) => {
  console.log(props)
  return (
    <h1> {props.course} </h1>
  )
}

const Content = (props) => {
  return (
    <p>
      {props.part_name} {props.exercices}
    </p>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of exercises {props.total}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content part_name={part1} exercices={exercises1} />
      <Content part_name={part2} exercices={exercises2} />
      <Content part_name={part3} exercices={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App