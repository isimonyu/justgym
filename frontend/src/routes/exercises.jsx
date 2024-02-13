import { getExercises } from "../exercises";
import { useLoaderData, Form, NavLink } from "react-router-dom";
import { getEquipments } from "../equipments";
import { getBodyParts } from "../bodyparts";

export async function loader({ request }) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const exercises = await getExercises(q);
    const equipments = await getEquipments();
    const bodyParts = await getBodyParts();
    return { exercises, q, equipments, bodyParts };

  } catch (error) {
    console.error('Error fetching exercises:', error);
    return { exercises: [] };
  }
}

export default function Exercises() {
  const { exercises, q, equipments, bodyParts} = useLoaderData();
  if (!exercises) {
    return null;
  }
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );

  return (
    <div className="exercise_form">
    <h1>Excercises</h1>
    <p className="description">Click on an exercise to view more information.</p>
    <span className="search-bar"> 
      <Form id="search-form" role="search">
                <input
                  id="q"
                  className={searching ? "loading" : ""}
                  aria-label="Search contacts"
                  placeholder="Search"
                  type="search"
                  name="q"
                  defaultValue={q}
                  onChange={(event) => {
                      const isFirstSearch = q == null;
                      submit(event.currentTarget.form, {
                          replace: !isFirstSearch,
                      });
                  }}
                />
                
              </Form>
              <Form action="create"> 
                  <button className="right_button" type="submit"> Add New</button>
      </Form>
    </span>
    <div className="exercise_list">
          <ul>
              {exercises.map((exercise) => (
                <li key={exercise.exercise_id}>
                  <NavLink to={`${exercise.exercise_id}`}> 
                    {exercise.name}
                  </NavLink>
                </li>
              ))}
            </ul>
    </div>
    </div>
  );
}