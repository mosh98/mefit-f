import WorkoutListCheckmark from "./WorkoutCheckmark";
import {useState} from "react";

/**
 * NOT USED
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */


export default function GoalWorkouts(props) {
    const { workouts } = props;
    const [workoutGoals, setWorkoutGoals] = useState(props.workouts);

    let handleWorkoutCompletion = (workoutId, completed) => {
        // Update the completed status of the workout with the given workoutId in the database

        // After updating the database, update the local state
        setWorkoutGoals(workoutGoals.map(workout => {
            if (workout.id === workoutId) {
                return { ...workout, completed: completed };
            }
            return workout;
        }));

    };

    return (
        <div>
            <WorkoutListCheckmark mode="complete" workouts={workouts} onWorkoutCompletion={handleWorkoutCompletion} />
        </div>
    );
}


export const goalsFive = [{
    "id": 1,
    "endDate": "2023-3-34",
    "achieved": false,
    "active": true,
    "profile": 1,
    "workouts": [
        {
            "id": 1,
            "name": "Chest Blaster",
            "type": "Chest",
            "completed": true,
            "programs": [],
            "exercises": [
                {
                    "id": 3,
                    "name": "Bench Press",
                    "description": "A compound exercise that works the chest, shoulders, and triceps using a barbell.",
                    "muscleGroup": "Chest",
                    "exerciseImageLink": null,
                    "videoLink": null,
                    "reps": 8,
                    "sets": 3,
                    "completed": false,
                    "userExperience": "Beginner"
                }
            ],
            "experienceLevel": "Beginner"
        },
        {
            "id": 2,
            "name": "Chest Blaster",
            "type": "Chest",
            "completed": false,
            "programs": [],
            "exercises": [
                {
                    "id": 6,
                    "name": "Cable Fly",
                    "description": "An isolation exercise that targets the chest muscles using cable machines.",
                    "muscleGroup": "Chest",
                    "exerciseImageLink": null,
                    "videoLink": null,
                    "reps": 12,
                    "sets": 3,
                    "completed": false,
                    "userExperience": "Intermediate"
                },
            ],
            "experienceLevel": "Intermediate"
        },
        {
            "id": 3,
            "name": "Back buster",
            "type": "Back",
            "completed": false,
            "programs": [],
            "exercises": [
                {
                    "id": 11,
                    "name": "Seated Cable Rows",
                    "description": "An isolation exercise that targets the mid-back muscles using a cable machine.",
                    "muscleGroup": "Back",
                    "exerciseImageLink": null,
                    "videoLink": null,
                    "reps": 12,
                    "sets": 3,
                    "completed": false,
                    "userExperience": "Beginner"
                }
            ],
            "experienceLevel": "Intermediate"
        }
    ],
}
]