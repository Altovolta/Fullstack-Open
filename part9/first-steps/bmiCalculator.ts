import { isNumber } from "./utils";

interface BmiInformation {
    height: number,
    weight: number 
}

const INVALID_ARGS = "Invalid number of arguments. Should be <height> <weight>";
const INVALID_ARGS_TYPE = "Inputs should be numbers";

const parseArgs = (argv: string[]): BmiInformation => {

    if (argv.length != 4) { throw new Error(INVALID_ARGS); }

    if(!isNumber(argv[2]) || !isNumber(argv[3])) {
        throw new Error(INVALID_ARGS_TYPE);
    }

    const height = Number(argv[2]);
    const weight = Number(argv[3]);

    return { height, weight };
};


export const calculateBmi = (height:number, weight:number): string => {

    const bmi: number =  weight / ((height / 100) ** 2);

    if (bmi < 18.5) {
        return "Underweight";
    } 
    else if (bmi < 25) {
        return "Normal range";
    }
    else if (bmi < 30 ) {
        return "Overweight";
    }
    
    return "Obese";

};

if (require.main === module) {
    try {
        const { height, weight } = parseArgs(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error: " + error.message);
        }
        
    }
}
