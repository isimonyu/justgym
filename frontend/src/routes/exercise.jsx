import { Form, useLoaderData, useNavigate,redirect } from "react-router-dom";
import CloseButton from 'react-bootstrap/CloseButton';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { getExercise, getExercises, deleteExercise } from "../exercises";
import { getEquipment, getEquipments } from "../equipments";
import { getBPbyExerciseId, deleteEBPid } from "../ebp";
import { getBodyParts } from "../bodyparts";
import { getSetsByExerciseID, getTotalByExerciseID, getAvgByExerciseID, deleteSetid } from "../sets";
import { convertDate } from "./weights";
import { getUrl } from "../graph_api";

async function convertSetsUrl(sets, attribute, labelName) {
  let labels = [];
  let data = [];
  sets.map((set) => {
      labels.push(convertDate(set.date));
      data.push(parseFloat(set[attribute]))
  })
  let obj = {
      labels: labels,
      datasets: [{
          label: labelName,
          data: data, 
          fill:false,
      }],
  };
  let options = {
  };
  const url = await getUrl(obj, options);
  if (!url) {
      throw new Response("", {
      status: 404,
      statusText: "Not Found",
      });
  }
  return url
};

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
    const history = await getSetsByExerciseID(params.exerciseId);
    const total = await getTotalByExerciseID(params.exerciseId);
    const average = await getAvgByExerciseID(params.exerciseId);

    // Turn data to Graph URLs
    const total_repsURL = await convertSetsUrl(total, "total_reps", "Total Reps by Date")
    const total_weightURL = await convertSetsUrl(total, "total_weight", "Total Weight by Date")
    const avg_repsURL = await convertSetsUrl(average, "average_reps", "Average Reps by Date")
    const avg_weightURL = await convertSetsUrl(average, "average_weight", "Average Weight by Date")
    const avg_volumeURL = await convertSetsUrl(average, "average_volume", "Average Volume by Date")
    
    return { exercise, equipment, bp, bodyParts, equipments, history, total, average, total_repsURL, total_weightURL, avg_repsURL, avg_weightURL, avg_volumeURL };
  }  

export async function action({ request, params }){
    // Get data from Form
    const formData = await request.formData();
    const updates = Object.fromEntries(formData)
    const bp = updates.parts.split(',')

    const deleteEBP = async () => {
        for (let id in bp){
            console.log(bp[id])
            await deleteEBPid(bp[id])
        }
    }

    await deleteEBP().then(

        await deleteExercise(params.exerciseId)
    )

    return redirect('/exercises/')
}

export async function deleteSet(e, es_id, exerciseId, navigate) {
  e.preventDefault();
  if (
    !confirm(
      "Please confirm you want to delete this stat."
    )
  ) {
    return
  }

  await deleteSetid(es_id)
  return navigate(`/exercises/${exerciseId}/`)
}


export default function Exercise() {
 const { exercise, equipment, bp, history, total, average, total_repsURL, total_weightURL, avg_repsURL, avg_weightURL, avg_volumeURL } = useLoaderData();
 const navigate = useNavigate()
 const original = []
  bp.map((p) => {
  original.push(p.ebp_id)
  });

  return (
    <div id="exercise">
          <CloseButton onClick={() => {navigate('/exercises/')}} /> 
        <br />
        <br />
        <div className="header">
          <h2>
                {exercise[0].name}{" "}
          </h2>
          <div className="buttons">
          <Form action="edit">
            <Button type="submit" variant="secondary" className="right_button left_button">Edit</Button>
          </Form>
          <Form
            method="post"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this exercise."
                )
              ) {
                event.preventDefault();
                
              }
            }}
          >
            <Button type="submit" variant="danger" name='parts' value={original}>Delete</Button>
          </Form>
        </div>
        <br />
        </div>
        <div className="exercise_info">
          <div>
              Equipment: <Card style={{ width: '18rem' }} body>{equipment[0].name}</Card>
          </div>
          <div>
            <p>
                Muscle Groups Worked:
            </p>
            <ListGroup horizontal>
                {bp.map((p) => (
                    <ListGroup.Item key={p.name}>
                        {p.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <br />
          </div>
        </div>
        <div>
        {history.length > 0 ? 
          <Tabs
          defaultActiveKey="history"
          className="mb-3 tab_style"
          fill
          >
            <Tab eventKey="history" title="History" className="exercise_sets">
            <Table striped bordered hover size="sm"> 
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Reps</th>
                  <th>Weight (lbs)</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                  {history.map((set) => (
                    <tr key={set.es_id}>
                      <td>
                        {convertDate(set.date)}
                      </td>
                      <td>
                      {set.reps}
                      </td>
                      <td>
                      {set.weight}
                      </td>
                      <td>
                      <BsPencilSquare className="edit_icon" onClick={ () => {navigate(`/sets/${set.es_id}`)}}></BsPencilSquare>
                      </td>
                      <td>
                      <BsFillTrashFill className="delete_icon" onClick={(e) => {deleteSet(e, set.es_id, exercise[0].exercise_id, navigate)}}></BsFillTrashFill>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </Table>
            </Tab>
            <Tab eventKey="stats" title="Stats">
              <div className="exercise_sets">
              <Tabs
              defaultActiveKey="total"
              className="mb-3 tab_style table_tabs"
              fill
              >
                <Tab eventKey="total" title="Totals">
                  <Table striped bordered hover size="sm">
                      <thead>
                      <tr>
                        <th>Date</th>
                        <th>Total Reps</th>
                        <th>Total Weight (lbs)</th>
                      </tr>
                      </thead>
                      <tbody>
                        {total.map((set) => (
                          <tr key={set.date}>
                            <td>
                              {convertDate(set.date)}
                            </td>
                            <td>
                            {set.total_reps}
                            </td>
                            <td>
                            {set.total_weight}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="average" title="Averages">
                  <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                          <th>Date</th>
                          <th>Average Reps</th>
                          <th>Average Weight (lbs)</th>
                        </tr>
                        </thead>
                        <tbody>
                          {average.map((set) => (
                            <tr key={set.date}>
                              <td>
                                {convertDate(set.date)}
                              </td>
                              <td>
                              {set.average_reps}
                              </td>
                              <td>
                              {set.average_weight}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                    </Table>
                  </Tab>
              </Tabs>
              </div>
            </Tab>
            <Tab eventKey="chart" title="Charts">
              <div className="exercise_sets">
              <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                      <Accordion.Header>Total Reps by Date</Accordion.Header>
                          <Accordion.Body>
                          <Image src={total_repsURL} className="sets_img" fluid></Image>
                          </Accordion.Body>
                      </Accordion.Item>
                  <Accordion.Item eventKey="1">
                      <Accordion.Header>Total Weight by Date</Accordion.Header>
                          <Accordion.Body>
                              <Image src={total_weightURL} className="sets_img" fluid></Image>
                          </Accordion.Body>
                      </Accordion.Item>
                  <Accordion.Item eventKey="2">
                      <Accordion.Header>Average Reps by Date</Accordion.Header>
                          <Accordion.Body>
                              <Image src={avg_repsURL} className="sets_img" fluid></Image>
                          </Accordion.Body>
                      </Accordion.Item>
                  <Accordion.Item eventKey="3">
                      <Accordion.Header>Average Weight by Date</Accordion.Header>
                          <Accordion.Body>
                              <Image src={avg_weightURL} className="sets_img" fluid></Image>
                          </Accordion.Body>
                      </Accordion.Item>
                  <Accordion.Item eventKey="4">
                      <Accordion.Header>Average Volume by Date</Accordion.Header>
                          <Accordion.Body>
                              <Image src={avg_volumeURL} className="sets_img" fluid></Image>
                          </Accordion.Body>
                      </Accordion.Item>
              </Accordion>
              
              </div>
            </Tab>
          </Tabs>
        : 
        <p>
          No data recorded for this exercise. Click on "Exercise Sets" to add some!
        </p>
        }
        </div>

    </div>
  );
}