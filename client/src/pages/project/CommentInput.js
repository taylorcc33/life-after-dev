import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import Send from "../../icons/Send.png";

export default function CommentInput({ project, updateComments }) {
  const [comment, setComment] = useState("");

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await Axios.post(`/api/projects/${project.id}/comments`, {
        body: comment,
      });
      console.log("axios post for comment", res.data);
      updateComments(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <NewComment onChange={handleChange} placeholder="Write a comment..." />
        <SendIcon src={Send} />
      </form>
    </Wrapper>
  );
}

const NewComment = styled.input`
  width: 210px;
  height: 50px;
  border-radius: 10px;

  &::placeholder {
    padding-left: 0.5rem;
  }
`;
const Wrapper = styled.div``;

const SendIcon = styled.img`
  position: relative;
  padding: 10;
`;
