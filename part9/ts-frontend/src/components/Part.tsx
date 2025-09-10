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

  const coursePart = props.coursePart
  let partDetails = null;

  switch(coursePart.kind) {
    case "basic":
      partDetails = <p style={{ fontStyle: 'italic' }}>{coursePart.description}</p>
      break;
    case "group":
      partDetails = <p>Project exercises {coursePart.groupProjectCount}</p>
      break;
    case "background":
      partDetails = (
        <>
          <p style={{ fontStyle: 'italic' }}>{coursePart.description}</p>
          <p>Submit to {coursePart.backgroundMaterial}</p>
        </>
      )          
      break;
    default:
      assertNever(coursePart)
      break;
  }

  return (
    <div>
      <b>{coursePart.name} {coursePart.exerciseCount}</b>
      {partDetails}
    </div>
  )
}

export default Part