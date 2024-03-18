import React from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { getWeight, editWeight } from "../weights";
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';


export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    updates.weight_id = params.weightId
    updates.user_id = 1
    await editWeight(updates)

    return redirect('/weights')
}

export async function loader({ params }) {
    const weight = await getWeight(params.weightId)
    if (!weight) {
        throw new Response("", {
        status: 404,
        statusText: "Not Found",
        });
    } 
    return {weight}
}

export default function EditWeight() {
    const {weight} = useLoaderData();
    const navigate = useNavigate();


    return (
        <div>
            <CloseButton onClick={() => {navigate('/weights/')}} /> 
            <br />
            <br />
            <Form method="post" className="weight_form">
              <h1>Edit Weight Log</h1>
              <p>Change weight log data as needed or press "Cancel" to go back</p>
              <label htmlFor="date">Date*: </label> <br />
              <input type="date" name="date" id="date" defaultValue={weight[0].date.substring(0,10)} />
              <br />
              <br />
              <label htmlFor="weight">Weight* (lbs) : </label> <br />
              <input type="number" name="weight" id="weight" defaultValue={weight[0].weight} />
              <br />
              <br />
              <p className="buttons">
                  <Button className="left_button" variant="light" onClick={() => { navigate('/weights/');}}>Cancel</Button>
                  <Button className="right_button"  type="submit">Save</Button>
              </p>
            </Form>
        </div>
    )
}