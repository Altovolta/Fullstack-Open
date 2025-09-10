import type { JSX } from "react"

interface CourseParts {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  courses: CourseParts[]
}

const Content = (props: ContentProps): JSX.Element => {

  return (
    <div>
      {props.courses.map((course, i) => 
        <p key={i}>
          {course.name} {course.exerciseCount}
        </p>
      )}
    </div>
  )
}

export default Content