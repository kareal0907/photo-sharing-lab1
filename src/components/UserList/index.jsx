import React, { useEffect, useState } from "react";
import { Divider, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchModel("/user/list").then(setUsers).catch((requestError) => setError(requestError.message));
  }, []);

  return (
    <div className="user-list">
      <Typography variant="h6" component="h2" gutterBottom>People</Typography>
      {error && <Typography color="error">Unable to load users.</Typography>}
      <List component="nav" aria-label="Users">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItemButton component={RouterLink} to={`/users/${user._id}`}>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} secondary={user.occupation} />
            </ListItemButton>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;

