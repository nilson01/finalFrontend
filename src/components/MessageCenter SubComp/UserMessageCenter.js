import React, { useState, useEffect } from "react";
import { makeStyles, Container } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { getAllNotificationsAPIMethod } from "../../api/generalClient";

const styles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
  },
  rightbar: {
    display: "flex",
    height: "100%",
    width: "80%",
    backgroundColor: theme.palette.primary.main,
    alignItems: "center",
    justifyContent: "center",
  },
  rightContainer: {
    height: "95%",
    width: "95%",
    backgroundColor: theme.palette.primary.dark,
  },
  contentContainer: {
    height: "85%",
    width: "100%",
  },
}));

export default function MessageCenter(props) {
  const columns = [
    { field: "date", headerName: "Date", width: 250 },
    { field: "title", headerName: "Title", width: 350 },
    { field: "message", headerName: "Message", width: 650, sortable: false },
  ];
  const [rows, setRows] = useState([]);
  async function fetchData() {
    try {
      getAllNotificationsAPIMethod((res) => {
        var temp = [];
        res.data.data.infos.forEach((el) => {
          temp.push({
            id: el._id,
            date: el.Date,
            title: el.Title,
            message: el.Notice,
          });
        });
        setRows(temp);
        // console.log("Printing here", temp);
      });
    } catch (err) {
      alert(err.response);
    }
  }
  useEffect(() => {

    fetchData();
    props.socket.on('userNotification', fetchData);

  }, []);
  const classes = styles();
  return (
    <Container className={classes.contentContainer}>
      <DataGrid rows={rows} columns={columns} pageSize={7} />
    </Container>
  );
}
