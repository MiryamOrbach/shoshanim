import React from 'react';
import Chip from '@material-ui/core/Chip';
import { Grid } from '@material-ui/core';
import FileIcon from '@material-ui/icons/ArrowDownwardOutlined';



interface FileProps{
    file:any;
}

export default function File(props:FileProps){
    return(
        <Grid container justify="center" xs={12}>
            <Grid item xs={7} container justify="center" spacing={3} direction="row" style={{backgroundColor:'#e0e0e0',height:40,borderRadius:10,marginBottom:8}}>
<Grid item>
     <a style={{textDecoration: 'none',marginTop:5,color:'black'}}
             href = {"http://51.91.110.239/document/"+props.file.lien_doc}  
             target = "_blank">{props.file.nom_doc}</a>
</Grid>
            </Grid>
        </Grid>
    );
}