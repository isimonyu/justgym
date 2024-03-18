import { useLoaderData, useNavigate } from "react-router-dom";
import { getTotalToday, getTotalLastDays } from "../sets";

export async function loader({ params }) {
    const today = await getTotalToday();
    if (!today) {
        throw new Response("", {
        status: 404,
        statusText: "Not Found",
        });
    } 
    const lastDays = await getTotalLastDays();
    if (!lastDays) {
        throw new Response("", {
        status: 404,
        statusText: "Not Found",
        });
    } 
    return { today, lastDays };
}

export default function Index() {
    const { today, lastDays } = useLoaderData();
    const navigate = useNavigate();

    return (
        <div>
            {console.log(today)}
            <h1>Welcome!</h1>
            <h3>Summary</h3>
            {today[0].sets > 0 ? 
            <p>Today, <br />
            You did <strong>{today[0].sets}</strong> sets and moved <strong>{today[0].weight}</strong> lbs!</p>
            :
            <p>Add your exercise sets for today to view stats!</p>
            }
            <p>
                In the last 7 days,  <br />
                You did a total of <strong>{lastDays[0].sets}</strong> sets and moved <strong>{lastDays[0].weight}</strong> lbs!
            </p>
            <br />
            <h3>Where to Start</h3>
            <p>
                Journal your weight for today in <span className="index_link" onClick={() => {navigate('weights/')}}>Weight Logs</span>.
            </p>
            <p>
                Browse current exercises or create a new one in <span className="index_link" onClick={() => {navigate('exercises/')}}>Exercises</span>.
            </p>
            <p>
                Add sets for exercises in <span className="index_link" onClick={() => {navigate('sets/')}}>Exercise Sets</span>.
            </p>
            <p>
                View data for exercises in <span className="index_link" onClick={() => {navigate('exercises/')}}>Exercises</span>.
            </p>

        </div>
    );
  }