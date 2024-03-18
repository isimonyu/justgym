import React from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { createWeight } from "../weights";
import Button from 'react-bootstrap/Button';

export async function action({ request }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    updates.user_id = 1
    console.log(updates)
    await createWeight(updates)

    return redirect('/weights/')
}

export default function CreateWeight() {
    const navigate = useNavigate();

    return (
        <Form method="post" className="weight_form">
            <h1>Add Weight Log</h1>
            <p>Takes 1 minute. Required Fields (*)</p>
            <label htmlFor="date">Date*: </label> <br />
            <input type="date" name="date" id="date" />
            <br />
            <br />
            <label htmlFor="weight">Weight* (lbs) : </label> <br />
            <input type="number" name="weight" id="weight"  />
            <br />
            <br />
            <p className="buttons">
                <Button className="left_button" variant="light" onClick={() => { navigate('/weights/');}}>Cancel</Button>
                <Button className="right_button" variant="secondary" type="submit">Save</Button>
            </p>
        </Form>
    )
}