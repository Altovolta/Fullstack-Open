import type { JSX } from "react"
import type { CoursePart } from "../types"

interface PartProps {
  coursePart: CoursePart
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


const Part = (props: PartProps): JSX.Element => {

  const getPartDetails = () => {
    switch(coursePart.kind) {
      case "basic":
        return <p style={{ fontStyle: 'italic' }}>{coursePart.description}</p>
      case "group":
        return <p>Project exercises {coursePart.groupProjectCount}</p>
      case "background":
        return (
          <>
            <p style={{ fontStyle: 'italic' }}>{coursePart.description}</p>
            <p>Submit to {coursePart.backgroundMaterial}</p>
          </>
        )          
      case "special":
        return (
          <>
            <p style={{ fontStyle: 'italic' }}>{coursePart.description}</p>
            <p>Required skills: {coursePart.requirements.join(', ')}</p>
          </>
        )       
      default:
        return assertNever(coursePart)
    }
  }


  const coursePart = props.coursePart
  const partDetails = getPartDetails();

  return (
    <div>
      <b>{coursePart.name} {coursePart.exerciseCount}</b>
      {partDetails}
    </div>
  )
}

export default Part