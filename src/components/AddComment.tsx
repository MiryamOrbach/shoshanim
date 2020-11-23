import React, { useState } from 'react';
import BaseRequest from '../helpers/BaseRequest';
import { Grid, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';


interface AddCommentProps {
  course: any;
  ok: Function;
}
const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: 3
  },
  icon: {
    marginTop: 2,
  },
}));


export default function AddComment(props: AddCommentProps) {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const addComment = () => {
    console.log(props.course);
    const data = {
      "id_interv": props.course.id_interv,
      "id_elev": props.course.id_elev,
      "comment": comment
    }
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    BaseRequest("CreateComment", formData).then((res) => { props.ok() })
  }
  return (
    <Grid container xs={12} spacing={3} justify="center" alignItems="center">
      <Grid container direction="row-reverse" spacing={3} justify="center" item xs={12} >
        <Grid item>
          <Typography color="primary" variant="h5">
            הוספת הערה
        </Typography>
        </Grid>
        <Grid className={classes.grid} item>
          <CommentIcon color="primary" className={classes.icon} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField className='maxWidth' onChange={(e) => { setComment(e.target.value) }} variant="outlined" value={comment} multiline label="הערה"></TextField>
      </Grid>
      <Grid spacing={1} item container alignItems="flex-start" justify="flex-start" direction="row" xs={12}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={addComment}
          >
            אישור
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => { props.ok() }}
          >
            ביטול
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
