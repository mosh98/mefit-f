import React, {createContext, useContext, useEffect, useState} from 'react';
import keycloak from "./keycloak";
import {fetchProfileByKeycloakId, updateProfile} from "./api/profile";
import {Exercise, UserGoal, UserProfile, Workout} from "./const/interface";
import {fetchExercises} from "./api/exercises";
import {fetchWorkouts} from "./api/workouts";
import {fetchGoalById, updateGoal} from "./api/goal";

interface MeFitProviderProps {
    children: React.ReactNode;
}

interface MeFitContextType {
    profile: UserProfile | null;
    profileError: string | null;
    fetchProfileData: () => void;
    updateProfileApi: (profile: UserProfile) => Promise<{ profile: UserProfile | null; error: string | null }>;
    exercises: Exercise[] | null;
    exerciseError: string | null;
    fetchExerciseData: () => void;
    workouts: Workout[] | null;
    workoutError: string | null;
    fetchWorkoutData: () => void;
    goal: UserGoal | null;
    goalError: string | null;
    fetchGoalData: (goal: number | undefined) => void;
    updateGoalApi: (goalId: number, updatedGoal: UserGoal) => Promise<{ goal: UserGoal | null; error: string | null }>;
}

export const MeFitContext = createContext<MeFitContextType>({
    profile: null,
    profileError: null,
    fetchProfileData: () => {},
    updateProfileApi: () => Promise.resolve({ profile: null, error: null }),
    exercises: null,
    exerciseError: null,
    fetchExerciseData: () => {},
    workouts: null,
    workoutError: null,
    fetchWorkoutData: () => {},
    goal: null,
    goalError: null,
    fetchGoalData: () => {},
    updateGoalApi: () => Promise.resolve({ goal: null, error: null }),
});

export const useMeFitContext = () => useContext(MeFitContext);

const MeFitProvider: React.FC<MeFitProviderProps> = ({ children }) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [exercises, setExercises] = useState<Exercise[] | null>([]);
    const [exerciseError, setExerciseError] = useState<string | null>(null);
    const [workouts, setWorkouts] = useState<Workout[] | null>([]);
    const [workoutError, setWorkoutError] = useState<string | null>(null);
    const [goal, setGoal] = useState<UserGoal | null>(null);
    const [goalError, setGoalError] = useState<string | null>(null);

    const fetchProfileData = async () => {
        try {
            const { profile, error } = await fetchProfileByKeycloakId(keycloak.tokenParsed?.sub);
            if (error) {
                console.log("Fetch profile error", error);

                setProfileError(error);
            } else {
                console.log("Fetch profile", profile);

                setProfile(profile);
            }
        } catch (error: string | any) {
            console.log(error);
            setProfileError(error.message);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const updateProfileApi = async (updatedProfile: UserProfile) => {
        try {
            const { profile: UserProfile, error } = await updateProfile(updatedProfile, profile?.id);
            if (error) {
                console.log("Update profile", error);
                setProfileError(error)
                return { profile: null, error };
            } else {
                console.log("Update profile", profile);
                setProfile(profile);
                return { profile, error: null };
            }
        } catch (error: string | any) {
            console.log(error);
            return { profile: null, error: error.message };
        }
    };

    const fetchExerciseData = async () => {
        try {
            const { exercises: exercises, error } = await fetchExercises();
            if (error) {
                console.log("Fetch exercises error", error);
                setExerciseError(error);
            } else {
                console.log("Fetch exercises", exercises);
                setExercises(exercises);
            }
        } catch (error: string | any) {
            console.log(error);
            setExerciseError(error.message);
        }
    };

    useEffect(() => {
        fetchExerciseData();
    }, []);

    const fetchWorkoutData = async () => {
        try {
            const { workouts: workouts, error } = await fetchWorkouts();
            if (error) {
                console.log("Fetch workouts error", error);
                setWorkoutError(error);
            } else {
                console.log("Fetch workouts", workouts);
                setWorkouts(workouts);
            }
        } catch (error: string | any) {
            console.log(error);
            setWorkoutError(error.message);
        }
    }

    useEffect(() => {
        fetchWorkoutData();
    } , []);

    const fetchGoalData = async (goalId?: number) => {
        if (!goalId) return;
        try {
            const { goal, error } = await fetchGoalById(goalId);
            if (error) {
                console.log("Fetch goals error", error);
                setGoalError(error);
            } else {
                console.log("Fetch goals", goal);
                setGoal(goal);
            }
        } catch (error: string | any) {
            console.log(error);
            setGoalError(error.message);
        }
    }

    useEffect(() => {
        fetchGoalData();
    } , []);

    const updateGoalApi = async (goalId: number, updatedGoal: UserGoal) => {
        try {
            const { goal: UserGoal, error } = await updateGoal(goalId, updatedGoal);
            if (error) {
                console.log("Update goal", error);
                setGoalError(error)
                return { goal: null, error };
            } else {
                console.log("Update goal", goal);
                setGoal(goal);
                return { goal, error: null };
            }
        } catch (error: string | any) {
            console.log(error);
            return { goal: null, error: error.message };
        }
    }

    const contextValue = {
        profile,
        profileError,
        fetchProfileData,
        updateProfileApi,
        exercises,
        fetchExerciseData,
        exerciseError,
        workouts,
        workoutError,
        fetchWorkoutData,
        goal,
        goalError,
        fetchGoalData,
        updateGoalApi,
    };

    return <MeFitContext.Provider value={contextValue}>{children}</MeFitContext.Provider>;
};

export default MeFitProvider;