import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import "materialize-css";
// import { Button, Dropdown } from "react-materialize";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <li>
          <Link to="/createpost">CreatePost</Link>
        </li>,

        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <button
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              history.push("/login");
            }}
          >
            Logout
          </button>
        </li>,

        //Profile picture logo dropdown
        // <Dropdown
        //   id="Dropdown_6"
        //   options={{
        //     alignment: "left",
        //     autoTrigger: true,
        //     closeOnClick: true,
        //     constrainWidth: true,
        //     container: null,
        //     coverTrigger: true,
        //     hover: false,
        //     inDuration: 150,
        //     onCloseEnd: null,
        //     onCloseStart: null,
        //     onOpenEnd: null,
        //     onOpenStart: null,
        //     outDuration: 250,
        //   }}
        //   trigger={
        //     <img
        //       src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        //       style={{
        //         width: "50px",
        //         height: "50px",
        //         borderRadius: "80px",
        //         margin: "auto",
        //       }}
        //     />
        //   }
        // >
        //   <Link to="/profile">Profile</Link>

        //   <button
        //     onClick={() => {
        //       localStorage.clear();
        //       dispatch({ type: "CLEAR" });
        //       history.push("/login");
        //     }}
        //   >
        //     Logout
        //   </button>
        // </Dropdown>,
      ];
    } else {
      return [
        <li>
          <Link to="/signup">Signup</Link>
        </li>,

        <li>
          <Link to="/login">Login</Link>
        </li>,
      ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/login"} className="brand-logo left">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right ">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
