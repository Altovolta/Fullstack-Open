import { isNumber } from "./utils";

const INVALID_ARGS_TYPE = "Inputs should be numbers";

interface ExerciseReport {
    periodLength: number,
    trainingDays: number,
    success: boolean, 
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
}

interface ExerciseArguments {
    target: number,
    dialyExerciseHours: number[]
}

const parseArgs = (argv: string[]): ExerciseArguments => {

    if (argv.length < 4 ) { throw new Error("Invalid number of arguments"); }

    if (!isNumber(argv[2])) {throw new Error("Invalid target");}
    const target =  Number(argv[2]);

    const dialyExerciseHours: number[] = [];
    for(let i = 3; i < argv.length; i++ ) {
        if (!isNumber(argv[i])) {throw new Error(INVALID_ARGS_TYPE);}
        dialyExerciseHours.push(Number(argv[i]));
    }

    return { target, dialyExerciseHours };
};


const calculateExercises = (dialyExerciseHours: number[], target: number): ExerciseReport => {

    const periodLength = dialyExerciseHours.length;
    const trainingDays = dialyExerciseHours.filter(h => h !== 0).length;
    const totalHours: number = dialyExerciseHours.reduce(
        (accum, hour) => accum + hour, 0
    );

    const average = totalHours / periodLength;
    const success = average > target;

    const margin = average - target;
    let rating;
    let ratingDescription;

    if( margin < -0.5) {
        rating = 1;
        ratingDescription = 'too bad';
    }
    else if (margin < 0) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }
    else {
        rating = 3;
        ratingDescription = 'fantastic!!';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};


try {
    const { target, dialyExerciseHours } = parseArgs(process.argv);
    console.log(calculateExercises(dialyExerciseHours, target));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log("Error: " + error.message);
    }  
}
