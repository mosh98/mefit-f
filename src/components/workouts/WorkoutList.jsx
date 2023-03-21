import {Link} from "react-router-dom";

function WorkoutList(props) {

  const { workouts, error } = props;
  console.log(workouts);

  if (error) {
    return <p>{error}</p>;
  }

  if (!workouts) {
    return <p>Loading workouts...</p>;
  }


  // const allExerciseIds = new Set(
  //   workouts.flatMap(workout => workout.exercises.map(exercise => exercise.id))
  // );
  
  // console.log(allExerciseIds);



  return (
    <div>
      <ul>
        {/* {workouts.map((p) => (
          <li key={p.id}>
            <Link to={ "/workouts/" + p.id } >
              <span>{p.name}</span>
              <span>{p.type}</span>
              <span>{p.type}</span>
            </Link>
          </li>
        ))} */}
        {workouts.map((p) => (
          <li key={p.id}>
            <p>{p.name}</p>
            <ul>
              {p.exercises.map(exercise => <li key={exercise.id}>{exercise.name}</li>)}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutList;
