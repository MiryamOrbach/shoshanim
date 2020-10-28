import React, { useState, useEffect } from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import File from './File';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { DropzoneArea } from 'material-ui-dropzone'
import BaseRequest from '../helpers/BaseRequest';
interface AttachFilesProps {
    name: string;
    id: string;
}

export default function AttachFiles(props: AttachFilesProps) {

    const [files, setFiles] = useState<any[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]);

    useEffect(() => {
        getDocuments();
    }, [])

    const getDocuments = () => {
        const formData: FormData = new FormData();
        let data = {
            "id_elev": '3'
        };
        formData.append("data", JSON.stringify(data));
        BaseRequest("getDocument", formData).then(
            (res) => {
                console.log('nnnn', res)
                setFiles(res.data);
            })
    }

    return (
        <Grid spacing={2} justify={"center"} container xs={12}>
            <Grid spacing={2} style={{ height: '80%' }} item xs={9}>
                <Card variant="outlined">
                    <CardContent>
                        <Grid spacing={2} direction="column" container xs={12}>
                            <Grid direction="column" spacing={8} justify="center" item xs={12} >
                                <Grid style={{ marginBottom: 20, marginTop: 20 }} justify="center" alignItems="center" item xs={12} container direction="column" spacing={2}>
                                    {
                                        files.map((f) => { return <Grid style={{ width: 300 }} item xs={12}><File file={f} /></Grid> })
                                    }
                                </Grid>
                                <Grid style={{ marginBottom: 20 }} item xs={12}>
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
                                                "id_elev": '3',
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