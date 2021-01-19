import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Button, Card, Grid, Header, Icon } from "semantic-ui-react";
import UserProject from "./UserProject";
import "./style.css";
import { AuthContext } from "../providers/AuthProvider"; //Taylor added

let imagelinks = {
  github:
    "https://cdn2.iconfinder.com/data/icons/font-awesome/1792/github-square-512.png",
  linkedin:
    "https://www.vectorico.com/wp-content/uploads/2018/02/LinkedIn-Icon-Squircle-Dark.png",
  personalsite: "https://image.flaticon.com/icons/png/512/25/25284.png",
};

export default (props) => {
  const authContext = useContext(AuthContext); //Taylor added
  const [loginCheck, setLoginCheck] = useState(null); //Taylor added
  const [showLoggedInComp, setShowLoggedInComp] = useState(false); //Taylor added

  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getUser();
    getProjects();
  }, []);

  const getUser = async () => {
    try {
      let res = await axios.get(`/api/users/${props.match.params.id}`);
      //add flexible call
      console.log(res.data);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getProjects = async () => {
    try {
      let res = await axios.get(`/api/users/${props.match.params.id}/projects`);
      console.log(res.data);
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const renderLoggedIn = () =>
    //Taylor added
    authContext.user.id == props.match.params.id && (
      <div>
        <Button
          color="teal"
          onClick={() => props.history.push(`/profile/${user.id}/settings`)}
        >
          <Icon name="pencil" />
          Edit Profile
        </Button>
      </div>
    );

  return (
    <>
      <div className="userSection">
        <Grid>
          <Grid.Row centered columns={2}>
            <div className="namePlate">
              <Grid.Column>
                <Header as="h1">
                  {user.firstname} {user.lastname}{" "}
                </Header>
                <p>{user.tag}</p>
                {renderLoggedIn()}
              </Grid.Column>
              <Grid.Column>
                <img className="userpic" src={user.image} />
              </Grid.Column>
            </div>
          </Grid.Row>
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <div className="socialPlate center">
                <span className="socialText">Github</span>
                <a href={`http://${user.github_link}`} target="_blank">
                  <img
                    className="socialIcon"
                    src={imagelinks.github}
                    height="100px"
                    width="100px"
                  />
                </a>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <div className="socialPlate center">
                <span className="socialText">LinkedIn</span>
                <a href={`http://${user.linkedin_link}`} target="_blank">
                  <img
                    className="socialIcon"
                    src={imagelinks.linkedin}
                    height="100px"
                    width="100px"
                  />
                </a>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered columns={2}>
            <Grid.Column>
              <div className="socialPlate center">
                <span className="socialText">Personal Site</span>
                <a href={`http://${user.personal_site}`} target="_blank">
                  <img
                    className="socialIcon"
                    src={imagelinks.personalsite}
                    height="100px"
                    width="100px"
                  />
                </a>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <hr className="divider"></hr>

      <h2 className="center projectHeader">Projects</h2>

      <Grid>
        
          
            {projects.map((p) => (
              <UserProject key={p.id} project={p} />
            ))}
          
        
      </Grid>
    </>
  );
};