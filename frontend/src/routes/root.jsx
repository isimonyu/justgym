import { useEffect } from "react";
import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit } from "react-router-dom";
import { getContacts, createContact } from "../contacts";

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
  }  

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
}

export default function Root() {
    const navigation = useNavigation();

    return (
      <>
        <div id="sidebar">
          <h1>JustGym</h1>
            
          <nav>
          <ul>
              <NavLink
                    to={`/`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >Dashboard</NavLink>
              <NavLink
                    to={`exercises/`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >Exercises</NavLink>
              <NavLink
                    to={`weights/`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                        ? "pending"
                        : ""
                    }
                  >Weight Logs</NavLink>
            </ul>
          </nav>
        </div>
        <div 
        id="detail" 
        className={
          navigation.state === "loading" ? "loading" : ""
        }
        >
            <Outlet />
        </div>
      </>
    );
  }