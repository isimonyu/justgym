import React, { useState } from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { createExercise, getExerciseName } from "../exercises";
import { createEbp } from "../ebp";

export async function action({ request }) {
    // Get data from Form
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const bodyParts = updates.parts.split(',')
    console.log(bodyParts)
    // Create Exercise
    await createExercise(updates)
    // Get Exercise 
    let exercise
    await getExerciseName(formData.get('name')).then(async (res) => {
        exercise = res
        // Add Exercise to ebp
        for (let id in bodyParts) {
            await createEbp({'exercise_id': exercise[0].exercise_id, 'bp_id': bodyParts[id]})
        }
    })
    
    return redirect(`/exercises/${exercise[0].exercise_id}`);
  }

export default function CreateExercise() {
  const { bodyParts, equipments } = useLoaderData();
  const [parts, setParts] = useState([]);
  const navigate = useNavigate();

  const handleCheckbox = (bp_id) => {
    if (parts.includes(bp_id)) {
        setParts(parts.filter((id) => id !== bp_id));
    } else {
        setParts([...parts, bp_id]);
    }
  };

  return (
    <Form method="post" className="exercise_form">
        <h1>Create an Exercise</h1>
        <p>Required Fields (*)</p>
      <p>
        <span>Exercise Name*:</span> <br/>
        <input
          placeholder="Name"
          aria-label="Exercise name"
          type="text"
          name="name"
        />
      </p>
      <p>
        <span>Type of Equipment*:</span> <br/>
        <select name="equipment_id">
            <option value="" selected disabled hidden>--Pick One--</option>
            {equipments.map((equip) => (
                <option value={equip.equipment_id} key={equip.equipment_id}>
                    {equip.name}
                </option>
            ))}
        </select>
    </p>
    <p>
        <span>Muscles Worked* (Select all that apply): </span> <br/>
        <div className="body_parts">
            {bodyParts.map((part) => (
                <span key={part.bp_id}>
                <input 
                type="checkbox"
                id={part.bp_id}
                value={parts}
                name="parts"
                onChange={() => handleCheckbox(part.bp_id)}
                /> {" "}
                <label htmlFor={part.bp_id} className="radio">{part.name}</label>
                </span>
            ))}
        </div>
      </p>
      <p className="buttons"> 
        <button className="left_button" type="submit">Save</button>
        <button className="right_button"type="button" onClick={() => { navigate(-1);}}>Cancel</button>
      </p>
    </Form>
  );
}