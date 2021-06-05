import React, { useState, useEffect } from "react";
import { makeStyles, Container } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { getAllMessagesAPIMethod } from "../../api/adminClient";
// import { io } from "socket.io-client";
// var socket = io.connect('http://localhost:5000');

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
    { field: "id", headerName: "Id", width: 200 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "date", headerName: "Send Date", width: 200 },
    { field: "message", headerName: "Message", width: 500, sortable: false },
  ];

  const [rows, setRows] = useState([]);
  async function fetchData() {
    try {
      await getAllMessagesAPIMethod((res) => {
        // console.log(res.data.data.infos);
        var temp = [];
        res.data.data.infos.forEach((el) => {
          temp.push({
            id: el._id,
            name: el.name,
            email: el.email,
            date: el.date,
            message: el.message,
          });
        });
        setRows(temp);
      });
    } catch (err) {
      alert(err.response);
    }
  }

  useEffect(() => {
    fetchData();
    props.socket.on('chat', fetchData);

  }, []);



  const classes = styles();
  return (
    <Container className={classes.contentContainer}>
      <DataGrid rows={rows} columns={columns} pageSize={7} />
    </Container>
  );
}
