import React, { useEffect, useState } from "react";

import {
  Box,
  makeStyles,
  Typography,
  Container,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";

import { DataGrid } from "@material-ui/data-grid";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  getAllUsersAPIMethod,
  adminLoginAPIMethod,
  deleteUserAPIMethod,
} from "../../api/adminClient";

const styles = makeStyles((theme) => ({
  cardContainer: {
    marginTop: "2%",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },

  fontBody: {
    fontFamily: "Comfortaa",
    fontWeight: "regular",
    fontSize: "12px",
  },
  fontSeparator: {
    fontFamily: "Comfortaa",
    fontWeight: "bold",
    fontSize: "24px",
    color: theme.palette.secondary.main,
    marginBottom: "1%",
  },
}));

const MatDelete = ({ index }) => {
  const handleEditClick = async (e) => {
    // some action
    await deleteUserAPIMethod({ id: index });
  };

  return (
    <FormControlLabel
      control={
        <IconButton
          color="secondary"
          aria-label="add an alarm"
          onClick={handleEditClick}
        >
          <DeleteIcon style={{ color: "#0b4870" }} />
        </IconButton>
      }
    />
  );
};

export default function AdminDashboard(props) {
  const columns = [
    { field: "id", headerName: "Id", width: 250 },
    { field: "name", headerName: "Name", width: 250 },
    { field: "email", headerName: "Email", width: 250, sortable: false },
    {
      field: "joinedDate",
      headerName: "Joined Date",
      width: 250,
    },
    { field: "type", headerName: "Type", width: 100, sortable: false },
    {
      field: "delete",

      width: 50,
      sortable: false,
      disableClickEventBubble: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
          >
            <MatDelete index={params.row.id} />
          </div>
        );
      },
    },
  ];
  const [rows, setRows] = useState([]);
  const classes = styles();
  useEffect(() => {
    async function fetchData() {
      try {
        // console.log("Email:", localStorage.getItem("email") + " Password: " + { ...props });
        await adminLoginAPIMethod(
          {
            email: localStorage.getItem("email"),
            password: props.pass,
          },
          async (res) => {
            await getAllUsersAPIMethod((res) => {
              // console.log(res.data.data); //console log all users

              localStorage.setItem(
                "users",
                JSON.stringify(res.data.data.users)
              ); //stringify object and store

              var temp = [];
              res.data.data.users.forEach((el, index) => {
                temp.push({
                  id: el._id,
                  name: el.name,
                  email: el.email,
                  joinedDate: el.joinedDate,
                  type: el.accountType,
                });
              });
              setRows(temp);
            });
          }
        );
      } catch (err) {
        // console.log(err);
        alert(err.response);
      }
    }
    fetchData();
  }, [props.pass]);
  return (
    <>
      <Container display="flex" className={classes.cardContainer}>
        <Typography className={classes.fontSeparator}>All Users</Typography>
      </Container>
      <Box
        display="flex"
        style={{
          height: "70%",
          width: "100%",
        }}
      >
        <DataGrid rows={rows} columns={columns} pageSize={5} columnBuffer={5} />
      </Box>
    </>
  );
}
