import { useLoaderData, Form, useNavigate } from "react-router-dom";
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { getSets, deleteSetid } from "../sets";
import { convertDate } from "./weights";

export async function loader({ request }) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const sets = await getSets(q);

    return { sets, q };

  } catch (error) {
    console.error('Error fetching sets:', error);
    return { sets: [] };
  }
}

export async function deleteSet(e, es_id, navigate) {
    e.preventDefault();
    if (
      !confirm(
        "Please confirm you want to delete this stat."
      )
    ) {
      return
    }
  
    await deleteSetid(es_id)
    return navigate(`/sets/`)
  }

export default function Sets() {
  const { sets, q } = useLoaderData();
  if (!sets) {
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
            <h1>Exercise Sets</h1>
            <p className="description">Click a set to view more information.</p>
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
    <Table striped bordered hover size="sm"> 
        <thead>
        <tr>
            <th>Date</th>
            <th>Exercise</th>
            <th>Reps</th>
            <th>Weight (lbs)</th>
            <th>Edit</th>
        </tr>
        </thead>
        <tbody>
            {sets.map((set) => (
            <tr key={set.es_id}>
                <td>
                {convertDate(set.date)}
                </td>
                <td>
                {set.name}
                </td>
                <td>
                {set.reps}
                </td>
                <td>
                {set.weight}
                </td>
                <td>
                <BsPencilSquare className="edit_icon" onClick={ () => {navigate(`${set.es_id}`)}}></BsPencilSquare>
                <BsFillTrashFill className="delete_icon" onClick={(e) => {deleteSet(e, set.es_id, navigate)}}></BsFillTrashFill>
                </td>
            </tr>
            ))}
        </tbody>
    </Table>
    </div>
    </Container>
  );
}