import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import File from './File';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {DropzoneArea} from 'material-ui-dropzone'

interface AttachFilesProps{
    name:string
}

export default function AttachFiles(props:AttachFilesProps){

    const [files,setFiles]=useState(["file name 1","file name 2","file name 3"]);

    const handleChange =(files:any)=>{
     const file=[...files];
     file.push(files.target.value);
     setFiles(file);
    }
    return(
        <Grid spacing={2} justify={"center"} container xs={12}>
            <Grid spacing={2} style={{height:'80%'}}  item xs={6}>
        <Card variant="outlined">
      <CardContent>
<Grid spacing={2} direction="column" container xs={12}>
<Grid direction="column" spacing={8} justify="center" item xs={12} >
    <Grid style={{marginBottom:20}} item xs={12}>
 <Typography color="primary" variant="h5">
          טפסים מצורפים
        </Typography>
    </Grid>
            <Grid style={{marginBottom:20}} justify="center" alignItems="center"  item xs={12} container direction="column" spacing={2}>
                {
            files.map(f=>{return <Grid style={{width:300}} item xs={12}><File file={f}/></Grid>})
                }
            </Grid>
            <Grid style={{marginBottom:20}} item xs={12}>
            <DropzoneArea
        />
            </Grid>
        
          </Grid> 
</Grid>
</CardContent>
    </Card>
            </Grid>
    </Grid>
    )
}