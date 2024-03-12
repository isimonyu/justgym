import { Form, useLoaderData, useNavigate,redirect } from "react-router-dom";
import { getExercise, getExercises, deleteExercise } from "../exercises";
import CloseButton from 'react-bootstrap/CloseButton';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { getEquipment, getEquipments } from "../equipments";
import { getBPbyExerciseId, deleteEBPid } from "../ebp";
import { getBodyParts } from "../bodyparts";


export async function loader({ params }) {
    const exercise = await getExercise(params.exerciseId);
    if (!exercise) {
        throw new Response("", {
        status: 404,
        statusText: "Not Found",
        });
    } 
    const equipments = await getEquipments();
    const equipment = await getEquipment(exercise[0].equipment_id);
    const bp = await getBPbyExerciseId(params.exerciseId);
    const bodyParts = await getBodyParts();
    return { exercise, equipment, bp, bodyParts, equipments };
  }  

export async function action({ request, params }){
    // Get data from Form
    const formData = await request.formData();
    const updates = Object.fromEntries(formData)
    const bp = updates.parts.split(',')

    const deleteEBP = async () => {
      console.log('Removing EBP FK references')
        for (let id in bp){
            console.log(bp[id])
            await deleteEBPid(bp[id])
        }
    }

    await deleteEBP().then(

        await deleteExercise(params.exerciseId)
    )

    return redirect('/exercises')
}


export default function Exercise() {
 const { exercise, equipment, bp, bodyParts, equipments } = useLoaderData();
 const navigate = useNavigate()
 const original = []
  bp.map((p) => {
  original.push(p.ebp_id)
  });

  return (
    <div id="exercise">
          <CloseButton onClick={() => {navigate('/exercises')}} /> 
        <br />
        <br />
        <h1>
              {exercise[0].name}{" "}
        </h1>
        <div>
            Equipment: <Card style={{ width: '18rem' }} body>{equipment[0].name}</Card>
        </div>
        <p>
            Muscle Groups:
        </p>
        <ListGroup horizontal>
            {bp.map((p) => (
                <ListGroup.Item key={p.name}>
                    {p.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
              <br />
              <br />
        <div className="buttons">
          <Form action="edit">
            <Button type="submit" variant="secondary" className="left_button">Edit</Button>
          </Form>
          <Form
            method="post"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
                
              }
            }}
          >
            <Button type="submit" variant="danger" className="right_button" name='parts' value={original}>Delete</Button>
          </Form>
        </div>
    </div>
  );
}