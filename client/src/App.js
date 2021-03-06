import "./App.css";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import NoMatch from "./components/NoMatch";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import FetchUser from "./components/FetchUser";
import Project from "./pages/project/Project";
import UserSettings from "./components/UserSettings";
import LandingPage from "./pages/landing/LandingPage";
import User from "./pages/profile/User";
import { AppContainer, AppGrid, Logo, NavColumn } from "./styles/GlobalStyle";
import devpointlogo from "./icons/devpointlogo.png";
import ResultsPage from "./pages/landing/ResultsPage";
import About from "./pages/about/Aboutus";

function App() {
  return (
    <>
      <AppContainer>
        <AppGrid>
          <Navbar />
          <FetchUser>
            <Container style={{ width: 1160 }}>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/projects/:id" component={Project} />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/user/:id" component={User} />
                <Route exact path="/about" component={About} />
                <Route
                  exact
                  path="/profile/:id/settings"
                  component={UserSettings}
                />
                <Route exact path="/results" component={ResultsPage} />
                <Route component={NoMatch} />
              </Switch>
            </Container>
          </FetchUser>
        </AppGrid>
      </AppContainer>
    </>
  );
}

export default App;
