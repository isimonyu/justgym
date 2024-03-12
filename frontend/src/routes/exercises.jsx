import { useLoaderData, Form, useNavigate } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { getExercises } from "../exercises";
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
  const navigate = useNavigate()

  return (
    <Container className="exercise_form">
      <div className="header">
        <div className="left_header">
            <h1>Exercises</h1>
            <p className="description">Click an exercise to view more information.</p>
        </div>
        <Form action="create" className="right_header">  
            <Button className="right_button" type="submit"> Add New</Button>
        </Form>
        </div>
        <Form id="search-form" role="search" className="search-bar">
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
    <div className="exercise_list">
      <ListGroup>
          {exercises.map((exercise) => (
            <ListGroup.Item key={exercise.exercise_id} action onClick={() => navigate(`${exercise.exercise_id}`)}>
                {exercise.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
    </div>
    </Container>
  );
}