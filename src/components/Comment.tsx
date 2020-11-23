import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import { CommentData } from './Comments'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        textAlign: "left", maxHeight: "110px", height: "110px", overflowY: "auto", overflowX: "hidden"
    },
    typhography: {
        fontWeight: "bold"
    }
});


interface CommentProps {
    item: CommentData;
}
export default function Comment(props: CommentProps) {
    const classes = useStyles();

    return (
        <Card variant="outlined">
            <CardContent className={classes.card}>
                <Typography color="textSecondary" gutterBottom>
                    {props.item.prenom} {props.item.nom}
                </Typography>
                <Typography className={classes.typhography} color="textSecondary" gutterBottom>
                    {props.item.commentaire}
                </Typography>
            </CardContent>
        </Card>
    )
}