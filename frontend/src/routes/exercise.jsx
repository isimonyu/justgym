import { Form, useLoaderData, useFetcher,redirect } from "react-router-dom";
import { getExercise, getExercises, deleteExercise } from "../exercises";
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
 const original = []
  bp.map((p) => {
  original.push(p.ebp_id)
  });

  return (
    <div id="contact">

      <div>
        <h1>
              {exercise[0].name}{" "}
          {/* <Favorite contact={contact} /> */}
        </h1>
        <p>
            Equipment: {equipment[0].name}
        </p>
        <p>
            Muscle Groups:
        </p>
        <ul>
            {bp.map((p) => (
                <li key={p.name}>
                    {p.name}
                </li>
            ))}
        </ul>

        {exercise.equipment_id}

        <div className="buttons">
          <Form action="edit">
            <button className="left_button" type="submit">Edit</button>
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
            <button className="right_button" type="submit" name='parts'
            value={original}>Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

// function Favorite({ contact }) {
//     const fetcher = useFetcher();
//     let favorite = contact.favorite;
//     if (fetcher.formData) {
//         favorite = fetcher.formData.get("favorite") === "true";
//       }
//     return (
//     <fetcher.Form method="post">
//       <button
//         name="favorite"
//         value={favorite ? "false" : "true"}
//         aria-label={
//           favorite
//             ? "Remove from favorites"
//             : "Add to favorites"
//         }
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </fetcher.Form>
//   );
// }