import React from "react";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function UserDetail() {
  const { userId } = useParams();
  const user = models.userModel(userId);
  if (!user) return <Typography color="error">User not found.</Typography>;
  return <Card className="user-detail-card"><CardContent>
    <Typography variant="h4" component="h1" gutterBottom>{user.first_name} {user.last_name}</Typography>
    <Stack spacing={1}>
      <Typography><strong>Location:</strong> {user.location}</Typography>
      <Typography><strong>Occupation:</strong> {user.occupation}</Typography>
      <Typography paragraph>{user.description}</Typography>
      <Button component={RouterLink} to={"/photos/" + user._id} variant="contained">View photos</Button>
    </Stack>
  </CardContent></Card>;
}
export default UserDetail;

