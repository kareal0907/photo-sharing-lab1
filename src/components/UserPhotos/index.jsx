import React, { useEffect, useState } from "react";
import { Alert, Card, CardContent, CircularProgress, Divider, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";
import kenobi1 from "../../images/kenobi1.jpg";
import kenobi2 from "../../images/kenobi2.jpg";
import kenobi3 from "../../images/kenobi3.jpg";
import kenobi4 from "../../images/kenobi4.jpg";
import ludgate1 from "../../images/ludgate1.jpg";
import malcolm1 from "../../images/malcolm1.jpg";
import malcolm2 from "../../images/malcolm2.jpg";
import ouster from "../../images/ouster.jpg";
import ripley1 from "../../images/ripley1.jpg";
import ripley2 from "../../images/ripley2.jpg";
import took1 from "../../images/took1.jpg";
import took2 from "../../images/took2.jpg";

const imageMap = { "kenobi1.jpg": kenobi1, "kenobi2.jpg": kenobi2, "kenobi3.jpg": kenobi3, "kenobi4.jpg": kenobi4,
  "ludgate1.jpg": ludgate1, "malcolm1.jpg": malcolm1, "malcolm2.jpg": malcolm2, "ouster.jpg": ouster,
  "ripley1.jpg": ripley1, "ripley2.jpg": ripley2, "took1.jpg": took1, "took2.jpg": took2 };

const formatDate = (value) => new Date(value.replace(" ", "T")).toLocaleString();

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    setPhotos(null); setError(null);
    fetchModel(`/photosOfUser/${userId}`).then(setPhotos).catch((requestError) => setError(requestError.message));
  }, [userId]);
  if (error) return <Alert severity="error">Unable to load photos.</Alert>;
  if (!photos) return <CircularProgress aria-label="Loading photos" />;
  return (
    <Stack spacing={3} className="user-photos">
      <Typography variant="h4" component="h1">Photos</Typography>
      {photos.map((photo) => (
        <Card key={photo._id} className="photo-card">
          <img src={imageMap[photo.file_name]} alt="User upload" className="photo-image" />
          <CardContent>
            <Typography color="text.secondary" gutterBottom>Added {formatDate(photo.date_time)}</Typography>
            <Stack spacing={1.5} divider={<Divider flexItem />}>
              {(photo.comments || []).map((comment) => (
                <div key={comment._id}>
                  <Typography variant="body2" color="text.secondary">{formatDate(comment.date_time)}</Typography>
                  <Typography><Link component={RouterLink} to={`/users/${comment.user._id}`}>
                    {comment.user.first_name} {comment.user.last_name}
                  </Link>{": "} {comment.comment}</Typography>
                </div>
              ))}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
export default UserPhotos;

