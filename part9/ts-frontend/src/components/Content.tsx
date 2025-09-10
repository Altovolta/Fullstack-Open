import type { JSX } from "react"
import type { CoursePart } from "../types"
import Part from "./Part"

interface ContentProps {
  courses: CoursePart[]
}

const Content = (props: ContentProps): JSX.Element => {

  return (
    <div>
      {props.courses.map((course, i) => (<Part key={i} coursePart={course} />))}
    </div>
  )
}

export default Content