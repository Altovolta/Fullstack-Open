import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({course}) => {
    console.log("Course: ", course)
    return (
        <div>
          <Header course={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts} />
        </div>
      )
}

export default Course