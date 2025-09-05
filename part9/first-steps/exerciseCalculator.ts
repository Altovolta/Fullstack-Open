interface ExerciseReport {
    periodLength: number,
    trainingDays: number,
    success: boolean, 
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

const calculateExercises = (dialyExerciseHours: number[], target: number): ExerciseReport => {

    let report: ExerciseReport;

    const periodLength = dialyExerciseHours.length
    const trainingDays = dialyExerciseHours.filter(h => h !== 0).length
    const totalHours: number = dialyExerciseHours.reduce(
        (accum, hour) => accum + hour, 0
    )

    const average = totalHours / periodLength
    const success = average < target

    const margin = average - target
    let rating;
    let ratingDescription;

    if( margin < -0.5) {
        rating = 1
        ratingDescription = 'too bad'
    }
    else if (margin < 0) {
        rating = 2
        ratingDescription = 'not too bad but could be better'
    }
    else {
        rating = 3
        ratingDescription = 'fantastic!!'
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))