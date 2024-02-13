import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root, { loader as rootLoader, action as rootAction, } from "./routes/root";
import ErrorPage from "./error-page";
import Index from "./routes/index";
import Exercises, {loader as exercisesLoader } from "./routes/exercises";
import Exercise, {loader as exerciseLoader, action as exerciseAction} from "./routes/exercise";
import EditExercise, {action as editExerciseAction} from "./routes/editExercises";
import CreateExercise, {action as createExerciseAction} from "./routes/createExercise";


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
          { index: true, element: <Index />},
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