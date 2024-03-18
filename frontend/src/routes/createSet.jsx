import React from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { getExercises } from "../exercises";
import { createSet } from "../sets";


export async function loader({ params }) {
    const exercises = await getExercises();
    if (!exercises) {
        throw new Response("", {
        status: 404,
        statusText: "Exercises Not Found",
        });
    }  
    return { exercises };
}
export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    await createSet(updates)
    return redirect(`/sets/`);
}

export default function CreateSet() {
  const { exercises } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" className="exercise_form">
    <h1>Create a Set</h1>
    <p>Takes 2 minutes. Required Fields (*)</p>
    <span>Exercise* :</span> <br/>
    <select name="exercise_id">
        {exercises.map((exercise) => (
            <option value={exercise.exercise_id} key={exercise.exercise_id}>
                {exercise.name}
            </option>
        ))}
    </select>
    <br />
    <br />
    <label htmlFor="date">Date* : </label> <br />
    <input type="date" name="date" id="date" />
    <br />
    <br />
    <label htmlFor="weight">Reps* : </label> <br />
    <input type="number" name="reps" id="reps"  />
    <br />
    <br />
    <label htmlFor="weight">Weight* (lbs) : </label> <br />
    <input type="number" name="weight" id="weight"  />
    <br />
    <br />
    
      <p className="buttons">
        <Button className="left_button" variant="light" onClick={() => { navigate(-1);}}>Cancel</Button>
        <Button className="right_button"  type="submit" >Save</Button>
      </p>
    </Form>
  );
}