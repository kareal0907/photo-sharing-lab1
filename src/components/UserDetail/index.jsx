import React, { useEffect, useState } from "react";
import { Alert, Button, Card, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    setUser(null); setError(null);
    fetchModel(`/user/${userId}`).then(setUser).catch((requestError) => setError(requestError.message));
  }, [userId]);
  if (error) return <Alert severity="error">Unable to load this user.</Alert>;
  if (!user) return <CircularProgress aria-label="Loading user" />;
  return (
    <Card className="user-detail-card"><CardContent>
      <Typography variant="h4" component="h1" gutterBottom>{user.first_name} {user.last_name}</Typography>
      <Stack spacing={1}>
        <Typography><strong>Location:</strong> {user.location}</Typography>
        <Typography><strong>Occupation:</strong> {user.occupation}</Typography>
        <Typography paragraph>{user.description}</Typography>
        <Button component={RouterLink} to={`/photos/${user._id}`} variant="contained">View photos</Button>
      </Stack>
    </CardContent></Card>
  );
}
export default UserDetail;

