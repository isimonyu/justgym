import { redirect, useLoaderData } from "react-router-dom";
import { deleteExercise } from "../exercises";
import { deleteEBPid } from "../ebp";

export async function action({ params }) {
    const {bp} = useLoaderData();
    for (part in bp) {
        await deleteEBPid(part.ebp_id)
    }
    await deleteExercise(params.exerciseId);
    return redirect("/");
};
