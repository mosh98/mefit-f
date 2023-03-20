import {Link} from "react-router-dom";

function WorkoutList(props) {

  const { workouts, error } = props;

  if (error) {
    return <p>{error}</p>;
  }

  if (!workouts) {
    return <p>Loading workouts...</p>;
  }


  return (
    <div>
      <ul>
        {workouts.map((p) => (
          <li key={p.id}>
            <Link to={ "/workouts/" + p.id } >
              <span>{p.name}</span> -
              <span>{p.type}</span>
              <span>{p.type}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkoutList;
