export interface Exercise {
    id?: number;
    name?: string;
    description?: string;
    muscleGroup?: string;
    exerciseImageLink?: string;
    videoLink?: string;
    reps?: number;
    sets?: number;
    userExperience?: string;
}

export interface Workout {
    id?: number;
    name?: string;
    type?: string;
    experienceLevel?: string;
    exercises?: Exercise[];
}