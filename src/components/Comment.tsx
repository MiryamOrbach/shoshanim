import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import { CommentData } from './Comments'

interface CommentProps {
    item: CommentData;
}
export default function Comment(props: CommentProps) {
    return (
        <Card variant="outlined">
            <CardContent style={{ textAlign: "right", maxHeight: "110px", height: "110px", overflowY: "auto", overflowX: "hidden" }}>
                <Typography color="textSecondary" gutterBottom>
                    {props.item.prenom} {props.item.nom}
                </Typography>
                <Typography style={{ fontWeight: "bold" }} color="textSecondary" gutterBottom>
                    {props.item.commentaire}
                </Typography>
            </CardContent>
        </Card>
    )
}