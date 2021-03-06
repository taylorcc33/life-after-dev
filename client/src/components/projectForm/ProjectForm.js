import Axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useHistory } from "react-router-dom";
import { Button, Form, Header, Image, Modal } from "semantic-ui-react";

const formFields = [
  { title: "Project Title", name: "title" },
  { title: "Github Link", name: "github_link" },
  { title: "Description", name: "description" },
  { title: "Live Link", name: "live_link" },
];

const ProjectForm = ({ query, addProject, closeModal, userId }) => {
  const [project, setProject] = useState({
    title: query,
    github_link: "",
    description: "",
    live_link: "",
  });
  const [image, setImage] = useState(null);
  let history = useHistory();
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setImage(acceptedFiles[0]);
    console.log(acceptedFiles[0]);
  }, []);

  const handleSubmit = (e) => {
    console.log("Project Add submit clicked");
    addProject(project, image, history);

    closeModal();
  };

  const styles = {
    modal: {
      position: "fixed",
      zIndex: 1,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.25)",
    },
    modal_content: {
      backgroundColor: "white",
      position: "absolute",
      top: "20%",
      left: "30%",
      width: "40%",
      padding: "20px",
      borderRadius: "5px",
      border: "2px solid black",
    },
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({ onDrop });

  return (
    <>
      <Header>{query}</Header>

      <Form id="newProject" onSubmit={handleSubmit}>
        <br />
        {formFields.map((item) => (
          <Form.Input
            label={item.title}
            placeholder={item.title}
            name={item.name}
            value={project[item.name]}
            onChange={(e) =>
              setProject({ ...project, [e.target.name]: e.target.value })
            }
          />
        ))}
        <div>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                Drag and drop a screenshot of your project here, or click to
                select a file.
              </p>
            )}
          </div>
          <ul>
            {acceptedFiles.map((f) => (
              <li>
                {f.path} - {f.size} bytes
              </li>
            ))}
          </ul>
        </div>
        <Button color="green">Submit</Button>
      </Form>
    </>
  );
};

export default ProjectForm;
