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
    completed?: boolean;
}

export interface Workout {
    id?: number;
    name?: string;
    type?: string;
    experienceLevel?: string;
    exercises?: Exercise[];
    completed?: boolean;
}

export interface UserProfile {
    id?: number,
    user?: number,
    profileImg?: "string",
    weight?: number,
    height?: number,
    medicalCondition?: "string",
    disabilities?: "string",
    goal?: number,
    address?: number
}

export interface UserKeycloak {
    name: string;
    firstName: string;
    lastName: string;
    username: string;
    sub: string;
    email: string;
    roles?: string[];
}

export interface UserAddress {
    address: string;
    post_code: string;
    city: string;
    country: string;
}

export interface UserGoal {
    id?: number;
    endDate?: string;
    achieved?: true;
    active?: boolean;
    profile?: number;
    workouts?: Workout[];
}
