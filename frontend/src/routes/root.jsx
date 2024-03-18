
import { Outlet, NavLink, useNavigation } from "react-router-dom";

export default function Root() {
    const navigation = useNavigation();

    return (
      <>
        <div id="sidebar">
          <h1>SetsOnSets <span id="signature">by Simon</span></h1>
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
                    to={`weights/`}
                    className={({ isActive, isPending }) =>
                    isActive
                    ? "active"
                    : isPending
                    ? "pending"
                    : ""
                  }
                  >Weight Logs</NavLink>
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
                      to={`sets/`}
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >Exercise Sets</NavLink>
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