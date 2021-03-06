import Axios from "axios";
import { useState } from "react";

const useRequest = () => {
  const [requestStatus, setRequestStatus] = useState("Join");
  const [myRequests, setMyRequests] = useState([]);

  const checkRequests = (project, id) => {
    // console.log("checkRequests", project);
    // debugger;
    Axios.get(`/api/projects/${project}/requests`)
      .then((res) => {
        res.data.forEach((r) => {
          console.log("checkRequests", id);
          if (r.user_id === id) {
            if (r.contributor === true) {
              setRequestStatus("Joined");
              console.log("request status joined");
            } else {
              setRequestStatus("Pending");
              console.log("request status pending");
            }
          }
        });
      })
      .catch((err) => {
        console.log("request hook error", project, err);
      });
  };

  const sendRequest = (project, id) => {
    Axios.post(`/api/projects/${project}/requests`, {
      user_id: id,
      project_id: project,
      contributor: false,
    })
      .then((res) => {
        setRequestStatus("Pending");
        console.log("sendRequest success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTheseRequests = async (user_id) => {
    try {
      let res = await Axios.get(`/api/requests/${user_id}/pending-with-names`);
      let dummyrequests = [];
      res.data.forEach((r) => {
        if (r.user_id == user_id) {
          dummyrequests.push(r);
        } else {
          return;
        }
      });
      dummyrequests.sort((a, b) => {
        let fa = a.title.toLowerCase();
        let fb = b.title.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      setMyRequests(dummyrequests);
    } catch (err) {
      console.log(err);
    }
  };

  const denyRequest = async (project_id, request_id) => {
    try {
      let dummy = [];
      let res = await Axios.delete(
        `/api/projects/${project_id}/requests/${request_id}`
      );
      myRequests.forEach((r) => {
        if (r.id !== request_id) {
          dummy.push(r);
        } else {
          return;
        }
      });
      setMyRequests(dummy);
    } catch (err) {
      console.log(err);
    }
  };

  const acceptRequest = async (project_id, request_id, incoming_user_id) => {
    try {
      let dummy = [];
      let res = await Axios.put(
        `/api/projects/${project_id}/requests/${request_id}`,
        {
          project_id: project_id,
          user_id: incoming_user_id,
          contributor: true,
        }
      );
      myRequests.forEach((r) => {
        if (r.id !== request_id) {
          dummy.push(r);
        } else {
          return;
        }
      });
      setMyRequests(dummy);
    } catch (err) {
      console.log(err);
    }
  };

  const removeContributor = async (project_id, request_id) => {
    try {
      let res = await Axios.delete(
        `/api/projects/${project_id}/requests/${request_id}`
      );
      console.log("removeContributor clicked");
    } catch (err) {
      console.log(err);
    }
  };

  return {
    sendRequest,
    checkRequests,
    requestStatus,
    getTheseRequests,
    myRequests,
    denyRequest,
    acceptRequest,
    removeContributor,
  };
};

export default useRequest;
