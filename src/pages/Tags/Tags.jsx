import { Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import styles from "./Tags.module.scss";

const Tags = () => {
  const { id } = useParams();

  return (
    <>
      <Typography classes={{ root: styles.title }}>
        Популярні на тему: {id}
      </Typography>
      <Grid container>
        <Grid xs={12}></Grid>
      </Grid>
    </>
  );
};

export default Tags;
