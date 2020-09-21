import React from 'react';
import Chip from '@material-ui/core/Chip';

interface FileProps{
    file:string;
}

export default function File(props:FileProps){
    return(
        <div >
<Chip label={props.file} component="a" href="#chip" clickable />
        </div>
    );
}