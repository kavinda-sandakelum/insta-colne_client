import NavBar from "./components/navbar";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home";
import Profile from "./components/profile";
import Login from "./components/login";
import Signup from "./components/singup";
import CreatePost from "./components/createpost";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/createpost">
        <CreatePost />
      </Route>
    </BrowserRouter>
  );
}

export default App;
