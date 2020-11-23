import { Card, CardContent, Grid, makeStyles } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import BaseRequest from '../helpers/BaseRequest'
import Comments from './Comments';
import PastLessons from './PastLessons';
import EnhancedTable, { HeadCell } from './Table';

const useStyles = makeStyles((theme) => ({
    card: {
        margin: "1% 15%",
        padding: "0 2% 2% 2%",
        direction: "rtl"

    },
}));

export default function TeacherHome() {
    const classes = useStyles();
    return (<>
        <Card className={classes.card}>
            <Grid
                spacing={2}
                direction="column"
                container
            >
                <Grid item xs={12}>
                    <PastLessons />
                </Grid>
                <Grid item xs={12}>
                    <Comments id={localStorage.getItem("id") || ""} isTeacher={true} />
                </Grid>
            </Grid>
        </Card>
    </>
    )
}