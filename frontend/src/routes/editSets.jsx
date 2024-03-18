import React, { useState, useEffect } from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { getExercises } from "../exercises";
import { getSetByID, updateSet } from "../sets";

export async function loader({ params }) {
    const exercises = await getExercises();
    if (!exercises) {
        throw new Response("", {
        status: 404,
        statusText: "Exercises Not Found",
        });
    } 
    const set = await getSetByID(params.setId);
    if (!set) {
        throw new Response("", {
        status: 404,
        statusText: "Set Not Found",
        });
    } 
    return { exercises, set };
  }  

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    await updateSet(params.setId, updates)
    return redirect(`/sets/`);
}

export default function EditSet() {
  const { exercises, set } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" className="exercise_form">
    <h1>Edit Set</h1>
    <p>Change set data as needed or press "Cancel" to go back</p>
    <span>Exercise* :</span> <br/>
    <select defaultValue={set[0].exercise_id} name="exercise_id">
        {exercises.map((exercise) => (
            <option value={exercise.exercise_id} key={exercise.exercise_id}>
                {exercise.name}
            </option>
        ))}
    </select>
    <br />
    <br />
    <label htmlFor="date">Date* : </label> <br />
    <input type="date" name="date" id="date" defaultValue={set[0].date.substring(0,10)} />
    <br />
    <br />
    <label htmlFor="weight">Reps* : </label> <br />
    <input type="number" name="reps" id="reps" defaultValue={set[0].reps} />
    <br />
    <br />
    <label htmlFor="weight">Weight* (lbs) : </label> <br />
    <input type="number" name="weight" id="weight" defaultValue={set[0].weight} />
    <br />
    <br />

        {console.log(set)}
    
      <p className="buttons">
        <Button className="left_button" variant="light" onClick={() => { navigate(-1);}}>Cancel</Button>
        <Button className="right_button"  type="submit" >Save</Button>
      </p>
    </Form>
  );
}