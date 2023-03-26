import { useState, useEffect } from 'react';
import PickProgram from './PickProgram';
import PickWorkouts from './PickWorkouts';

function ProgramORWorkouts() {
  const [programWorkout, setProgramWorkout] = useState(null);

  useEffect(() => {
    const storedSelection = JSON.parse(localStorage.getItem('programWorkoutSelection'));
    if (storedSelection) {
      setProgramWorkout(storedSelection);
    }
  }, []);

  return (
    <>
      <h2> {programWorkout ? programWorkout.name : 'You need to back to STEP3:Select a program or workouts'}</h2>
      {programWorkout && programWorkout.id === 1 && <PickProgram setProgramWorkout={setProgramWorkout} />}
      {programWorkout && programWorkout.id === 2 && <PickWorkouts setProgramWorkout={setProgramWorkout} />}
    </>
  );
}

export default ProgramORWorkouts;
