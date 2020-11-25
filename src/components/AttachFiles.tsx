import React, { useState, useEffect } from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import File from './File';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { DropzoneArea } from 'material-ui-dropzone'
import BaseRequest from '../helpers/BaseRequest';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    wrapperGrid: {
        height: '80%'
    },
    singleFile: {
        marginBottom: 20, marginTop: 20
    },
    file: {
        width: 300
    },
    dropZone: {
        marginBottom: 20
    }
});

interface AttachFilesProps {
    name: string;
    id: string;
}

export default function AttachFiles(props: AttachFilesProps) {
    const classes = useStyles();
    const [files, setFiles] = useState<any[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

    useEffect(() => {
        getDocuments();
    }, [])

    const getDocuments = () => {
        const formData: FormData = new FormData();
        let data = {
            "id_elev": props.id
        };
        formData.append("data", JSON.stringify(data));
        BaseRequest("getDocument", formData).then(
            (res) => {
                setFiles(res.data);
            })
    }

    return (
        <Grid spacing={2} justify={"center"} container xs={12}>
            <Grid spacing={2} className={classes.wrapperGrid} item xs={9}>
                <Card variant="outlined">
                    <CardContent>
                        <Grid spacing={2} direction="column" container xs={12}>
                            <Grid direction="column" spacing={8} justify="center" item xs={12} >
                                <Grid className={classes.singleFile} justify="center" alignItems="center" item xs={12} container direction="column" spacing={2}>
                                    {
                                        files.map((f) => { return <Grid className={classes.file} item xs={12}><File file={f} /></Grid> })
                                    }
                                </Grid>
                                <Grid className={classes.dropZone} item xs={12}>
                                    <DropzoneArea onDrop={(e) => {
                                        var file = e[0];
                                        var selected = [...selectedFiles];
                                        selected.push(file);
                                        setSelectedFiles(selected);
                                    }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained"
                                        color="primary" onClick={() => {
                                            var file = [...selectedFiles];
                                            const json = {
                                                "file": file,
                                                "id_elev": props.id,
                                            };
                                            var formData = new FormData();
                                            formData.append("data", JSON.stringify(json));
                                            const headersOptions = {
                                                'Content-Type': 'multipart/form-data'
                                            }
                                            BaseRequest("uploadFile", formData, headersOptions).then(
                                                (res) => {
                                                    getDocuments();
                                                    setSelectedFiles([]);
                                                })

                                        }}>אישור</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}