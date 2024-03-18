import { useLoaderData, Form, useNavigate, redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { getWeights, deleteWeight, getAvgWeightsByWeek, getAvgWeightsByMonth, getLastXDays } from "../weights";
import { getUrl } from "../graph_api";

async function convertWeightsUrl(weights, attribute, labelName) {
    let labels = [];
    let data = [];
    weights.map((weight) => {
        labels.push(weight[attribute]);
        data.push(parseFloat(weight.Weight))
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
        scales: {
          yAxes: [
            {
              ticks: {
                min: 150,
                max: 200,
                stepSize: 5,
              },
            },
          ],
        }
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
    const weights = await getWeights();
    if (!weights) {
        throw new Response("", {
        status: 404,
        statusText: "Not Found",
        });
    } 

    const avgWeekWeights = await getAvgWeightsByWeek();
    if (!avgWeekWeights) {
        throw new Response("", {
        status: 404,
        statusText: "Not Found",
        });
    } 

    const avgMonthWeights = await getAvgWeightsByMonth();
    if (!avgMonthWeights) {
        throw new Response("", {
        status: 404,
        statusText: "Not Found",
        });
    } 

    const last7Days = await getLastXDays();
    if (!last7Days) {
        throw new Response("", {
        status: 404,
        statusText: "Not Found",
        });
    } 

    const avgWeekURL = await convertWeightsUrl(avgWeekWeights, "Week", "Average Weight by Week");
    const avgMonthURL = await convertWeightsUrl(avgMonthWeights, "Month", "Average Weight by Month");
    const last7DaysURL = await convertWeightsUrl(last7Days.reverse(), "MonthDay", "Weight for Last 7 Days");

    return { weights, avgWeekURL, last7DaysURL, avgMonthURL };
  }  

export async function action(e, weight_id, navigate) {
    e.preventDefault()
    if (!confirm("Please confirm you want to delete this record.")){
        return 
    }
    
    await deleteWeight(weight_id)

    navigate('/weights/')
}

export function convertDate(dateStr) {
    let date = new Date(dateStr)
    let formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
    return formattedDate
}

export default function Weights() {
    const { weights, avgWeekURL, last7DaysURL, avgMonthURL } = useLoaderData();
    const navigate = useNavigate()

    return (
        <Container className="weight_form">
            <div className="header">
                <div className="left_header">
                    <h1>Weight Logs</h1>
                    <p className="description">Add a new weight log or browse through data and graphs.</p>
                    <p className="description">Last Updated: <strong>{weights[0].weight} lbs</strong> on <strong>{convertDate(weights[0].date)}</strong></p>
                </div>
                <Form action="create" className="right_header">  
                    <Button className="right_button" variant="secondary" type="submit"> Add New</Button>
                </Form>
            </div>
            <Tabs
            defaultActiveKey="history"
            className="mb-3 tab_style weights-tabs"
            fill
            >
                <Tab eventKey="history" title="History">
                    <p>Recent Weight Logs:</p>
                    <div className="weight_list">
                        <ListGroup>
                            {weights.map((weight) => (
                                <ListGroup.Item key={weight.weight_id}>
                                    <div className="history">
                                        <p>
                                            {convertDate(weight.date)}: {weight.weight} lbs 
                                        </p>
                                        <div className="weight_icons">
                                            <BsPencilSquare className="edit_icon" onClick={ () => {navigate(`${weight.weight_id}`)}}></BsPencilSquare>
                                            <BsFillTrashFill className="delete_icon" onClick={(e) => {action(e, weight.weight_id, navigate)}}></BsFillTrashFill>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </Tab>
                <Tab eventKey="graph" title="Graphs">
                    <div className="weight_list">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Last 7 Days</Accordion.Header>
                                    <Accordion.Body>
                                    <Image src={last7DaysURL} fluid></Image>
                                    </Accordion.Body>
                                </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Average Weight by Week</Accordion.Header>
                                    <Accordion.Body>
                                        <Image src={avgWeekURL} fluid></Image>
                                    </Accordion.Body>
                                </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Average Weight by Month</Accordion.Header>
                                    <Accordion.Body>
                                        <Image src={avgMonthURL} fluid></Image>
                                    </Accordion.Body>
                                </Accordion.Item>
                        </Accordion>
                    </div>
                </Tab>

            </Tabs>
        </Container>
    )
  }