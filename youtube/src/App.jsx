import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);

  console.log(user);
  const q = user?.accessToken;
  console.log(q);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {q ? <Home user={q} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/register">
          {!q ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">{!q ? <Login /> : <Redirect to="/" />}</Route>
        {q && (
          <>
            <Route path="/movies">
              <Home type="movies" user={q} />
            </Route>
            <Route path="/series">
              <Home type="series" user={q} />
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
