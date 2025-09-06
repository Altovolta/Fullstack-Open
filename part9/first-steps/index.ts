import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json())
app.get('/hello', (_req, res) => {
  res?.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const invalidInput = !height || !weight || isNaN(height) || isNaN(weight);
  
  if(invalidInput) {
    res.status(400).json({error: "malformatted parameters"});
  }

  const bmi = calculateBmi(height, weight);
  res.send({weight, height, bmi});
});

const parseArgs = (array: unknown[]): null | number[] => {
  const numbers = array.map(item => typeof item === 'number' ? item : Number(item))
  return numbers.some(hour => isNaN(hour)) ? null : numbers
}

app.post('/exercises', (req, res) => { 
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body
  
  if(!daily_exercises || !target) {
    res.status(400).send("missing parameters")
    return
  }

  const dialyExerciseHours = parseArgs(daily_exercises) 
  const targetHours = Number(target)
  
  if(!dialyExerciseHours || isNaN(targetHours)) {
    res.status(400).send({error: "malformatted parameters"})
    return
  }
  const report = calculateExercises(dialyExerciseHours, targetHours)
  res.status(200).send(report)
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});