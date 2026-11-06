import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function TopBar() {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  useEffect(() => { fetchModel("/user/list").then(setUsers).catch(() => {}); }, []);
  const userId = location.pathname.split("/")[2];
  const user = users.find((item) => item._id === userId);
  const fullName = user ? user.first_name + " " + user.last_name : "user";
  const context = location.pathname.startsWith("/photos/") ? "Photos of " + fullName : user ? fullName : "Photo Sharing";
  return <AppBar className="topbar-appBar" position="absolute"><Toolbar>
    <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>Lenovo</Typography>
    <Typography variant="h6" color="inherit">{context}</Typography>
  </Toolbar></AppBar>;
}
export default TopBar;

