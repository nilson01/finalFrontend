import React, { useState, useEffect } from "react";
import { CheckOnlineAPIMethod } from "../api/generalClient";
import { useHistory } from "react-router-dom";

export default function CheckOnline(props) {
  const history = useHistory();
  const [state, setState] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const sess = await CheckOnlineAPIMethod();
        if (
          sess.data &&
          (!props.isAdminRoute || JSON.parse(localStorage.getItem("isAdmin")))
        ) {
          setState(true);
        } else {
          // console.log("false");
          setState(false);
          history.push("/");
        }
      } catch (err) {
        alert(err.message);
      }
    }
    fetchData();
  });
  return <div>{state ? props.success : null}</div>;
}
