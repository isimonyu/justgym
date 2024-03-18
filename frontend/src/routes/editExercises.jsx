import React, { useState, useEffect } from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateExercise } from "../exercises";
import Button from 'react-bootstrap/Button';
import { createEbp, deleteEBPid, getEBPid } from "../ebp";


export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    console.log(updates)
    await updateExercise(params.exerciseId, updates)

    // Change Exercise and Body Part relationships if needed
    if (updates.parts != updates.og){
        const newParts = updates.parts.split(',')
        const oldParts = updates.og.split(',')

        // Check to add
        for (let id in newParts) {
            if (!oldParts.includes(newParts[id])){
                await createEbp({"exercise_id": params.exerciseId, "bp_id": newParts[id]})
            }
        }
        if (oldParts.length > 1) {
          // Check to delete
          for (let id in oldParts) {
              if (!newParts.includes(oldParts[id])){
                  //  Get ebp_id using bp_id
                  await getEBPid(params.exerciseId, oldParts[id])
                  .then(async (res) => {        
                      console.log(res)
                      await deleteEBPid(res[0].ebp_id)
                  })
                  
              }
          }
        }
    }


    return redirect(`/exercises/${params.exerciseId}`);
  }

export default function EditExercise() {
  const { exercise, equipment, bp, bodyParts, equipments } = useLoaderData();
  const navigate = useNavigate();

  const [parts, setParts] = useState([]);
  // Track original body parts to compare
  const original = []
  bp.map((p) => {
  original.push(p.bp_id)
  });

  useEffect(()=>{
    setParts(JSON.parse(JSON.stringify(original)))
    console.log(original)
  }, [])

  const handleCheckbox = (bp_id) => {
    if (parts.includes(bp_id)) {
        setParts(parts.filter((id) => id !== bp_id));
    } else {
        setParts([...parts, bp_id]);
    }
  };
  return (
    <Form method="post" className="exercise_form">
        <h1>Edit Exercise</h1>
        <p>Change exercise data as needed or press "Cancel" to go back</p>
      <p>
        <span>Exercise Name*</span> <br/>
        <input
          aria-label="Exercise name"
          type="text"
          name="name"
          defaultValue={exercise[0].name}
        />
      </p>
      <p>
        <span>Type of Equipment*:</span> <br/>
        <select defaultValue={equipment[0].equipment_id} name="equipment_id">
            {equipments.map((equip) => (
                <option value={equip.equipment_id} key={equip.equipment_id}>
                    {equip.name}
                </option>
            ))}
        </select>
    </p>
        <span>Muscles Worked* (Select all that apply): </span> <br/>
        <div className="body_parts">
            {bodyParts.map((part) => (
                <span key={part.bp_id}>
                <input 
                type="checkbox"
                id={part.bp_id}
                value={parts}
                name="parts"
                defaultChecked={original.includes(part.bp_id)}
                onChange={() => handleCheckbox(part.bp_id)}
                />
                    <label htmlFor={part.bp_id} className="radio">{part.name}</label>
                </span>
            ))}
        </div>
    
      <p className="buttons">
        <Button className="left_button" variant="light" onClick={() => { navigate('/exercises/');}}>Cancel</Button>
        <Button className="right_button" variant="secondary"  type="submit" name="og" value={original} >Save</Button>
      </p>
    </Form>
  );
}