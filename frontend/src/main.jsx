import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Root, { loader as rootLoader, action as rootAction, } from "./routes/root";
import ErrorPage from "./error-page";
// Index
import Index, {loader as indexLoader} from "./routes/index";
// Exercises
import Exercises, {loader as exercisesLoader } from "./routes/exercises";
import Exercise, {loader as exerciseLoader, action as exerciseAction} from "./routes/exercise";
import EditExercise, {action as editExerciseAction} from "./routes/editExercises";
import CreateExercise, {submitForm as createExerciseAction} from "./routes/createExercise";
// Weights
import Weights, {loader as weightsLoader, action as weightsAction} from "./routes/weights";
import Weight, {loader as weightLoader, action as weightAction} from "./routes/editWeight";
import CreateWeight, {action as createWeightAction} from "./routes/createWeight";
// Sets
import Sets, {loader as setsLoader } from "./routes/sets";
import CreateSet, { loader as setCreateLoader, action as createSetAction}  from "./routes/createSet";
import EditSet, {loader as setLoader, action as setAction} from "./routes/editSets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, 
            element: <Index />,
            loader: indexLoader,
          },
          // Exercises
          { path: "exercises",
            element: <Exercises />,
            loader: exercisesLoader,
          },
          { path: "exercises/:exerciseId",
          element: <Exercise />,
          loader: exerciseLoader,
          action: exerciseAction,
          },
          { path: "exercises/create",
          element: <CreateExercise />,
          loader: exercisesLoader,
          action: createExerciseAction,
          },
          { path: "exercises/:exerciseId/edit",
          element: <EditExercise />,
          loader: exerciseLoader,
          action: editExerciseAction,
          },
          // Weights
          { path: "weights",
            element: <Weights />,
            loader: weightsLoader,
            action: weightsAction,
          },
          { path: "weights/:weightId",
            element: <Weight />,
            loader: weightLoader,
            action: weightAction,
          },
          { path: "weights/create",
            element: <CreateWeight />,
            action: createWeightAction,
          },
          // Sets
          { path: "sets",
            element: <Sets />,
            loader: setsLoader,
          },
          { path: "sets/:setId",
          element: <EditSet />,
          loader: setLoader,
          action: setAction,
          },
          { path: "sets/create",
            element: <CreateSet />,
            loader: setCreateLoader,
            action: createSetAction,
          },
        ]
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);