import React, { useState } from "react";

import "./App.css";
import Landing from "./page/Landing Page";
import Live from "./page/Live Trades";
import Contact from "./page/Contact Page";
import About from "./page/About Page";
import Dashboard from "./page/Dashboard";
import Admin from "./page/Admin";
import Payment from "./page/Payment";
import Settings from "./page/Settings";
import Profile from "./page/Profile";
import PageNotFound from "./page/PageNotFound";
import Statistics from "./page/Statistics";
import MessageCenter from "./page/MessageCenter";
import ContactUserVAdmin from "./page/Contact User-Admin";

import Navbar from "./components/NavBar";
import UserTransGraph from "./components/Statistics SubComp/UserTransGraph";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import CheckOnline from "./components/CheckOnline";

import { io } from "socket.io-client";
var socket = io.connect('http://localhost:5000');


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fdfeff",
      dark: "#f7f9fb",
    },
    secondary: {
      light: "#B0D2E8",
      main: "#0b4870",
    },
  },
});
function App() {
  const [pass, setPass] = useState("");
  // console.log("From the app", pass);


  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Switch>
          <Route path="/profile">
            <CheckOnline success={<Profile />} />
          </Route>
          <Route path="/settings">
            <CheckOnline success={<Settings />} />
          </Route>
          <Route path="/payment">
            <CheckOnline success={<Payment />} />
          </Route>
          <Route path="/admin">
            <CheckOnline success={<Admin />} isAdminRoute={true} />
          </Route>
          <Route path="/msgcenter">
            <CheckOnline success={<MessageCenter socket={socket} />} />
          </Route>
          <Route path="/contactUserVAdmin">
            <CheckOnline success={<ContactUserVAdmin socket={socket} />} />
          </Route>
          <Route path="/dashboard">
            <CheckOnline success={<Dashboard pass={pass} />} />
          </Route>
          <Route path="/graph">
            <CheckOnline success={<UserTransGraph />} />
          </Route>
          <Route path="/statistics">
            <CheckOnline success={<Statistics />} />
          </Route>
          <Route path="/contact">
            <Navbar setPass={setPass} /> <Contact socket={socket} />
          </Route>
          <Route path="/live">
            <Navbar setPass={setPass} /> <Live />
          </Route>
          <Route path="/about">
            <Navbar setPass={setPass} /> <About />
          </Route>
          <Route exact path="/">
            <Navbar setPass={setPass} /> <Landing setPass={setPass} />
          </Route>
          <Route path="*" exact={true}>
            <Navbar setPass={setPass} /> <PageNotFound />
          </Route>

        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
