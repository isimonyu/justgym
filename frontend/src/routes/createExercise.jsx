import React, { useState } from "react";
import { useLoaderData, redirect, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { createExercise, getExerciseName } from "../exercises";
import { createEbp } from "../ebp";

export async function submitForm(event, parts, navigate) {
    event.preventDefault()
    // Get data from Form
    const formData = new FormData(event.target)
    const formDataObj = Object.fromEntries(formData.entries())
    let exercise
    // Create Exercise
    await createExercise(formDataObj).then(async (res) => {
      // Get Exercise 
      await getExerciseName(formDataObj.name).then(async (res) => {
        exercise = res

        // Add Exercise to ebp
        for (let id in parts) {
          await createEbp({'exercise_id': exercise[0].exercise_id, 'bp_id': parts[id]})
        }

        navigate(`/exercises`)
      })
    }) 
}

export default function CreateExercise() {
  const { bodyParts, equipments } = useLoaderData();
  const [parts, setParts] = useState([]);
  const navigate = useNavigate();

  const handleCheckbox = (event) => {
    const bp_id = event.target.id
    console.log(parts)
    if (parts.includes(bp_id)) {
        setParts(parts.filter((id) => id !== bp_id));
    } else {
        setParts([...parts, bp_id]);
    }
  };

  return (
    <Form onSubmit={(event) => submitForm(event, parts, navigate)} className="exercise_form">
        <h1>Create an Exercise</h1>
        <p>Takes 2 minutes. Required Fields (*)</p>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Exercise Name*:</Form.Label>
        <Form.Control type="text" placeholder="Name" name="name" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Type of Equipment*:</Form.Label>
        <Form.Select name="equipment_id">
            <option value="" selected disabled hidden>--Pick One--</option>
            {equipments.map((equip) => (
                <option value={equip.equipment_id} key={equip.equipment_id}>
                    {equip.name}
                </option>
            ))}
        </Form.Select>
    </Form.Group>
    <Form.Group>
        <Form.Label>Muscles Worked* (Select all that apply): </Form.Label>
        <div className="body_parts">
            {bodyParts.map((part) => (
            <div key={part.bp_id} className="mb-2">
                <Form.Check
                label={part.name}
                type="checkbox"
                id={part.bp_id}
                onChange={handleCheckbox}
              />
            </div>
            ))}
        </div>
      </Form.Group>
      <div className="buttons"> 
        <Button className="left_button" variant="light" onClick={() => { navigate(-1);}}>Cancel</Button>
        <Button className="right_button"  type="submit" >Save</Button>
      </div>
    </Form>
  );
}