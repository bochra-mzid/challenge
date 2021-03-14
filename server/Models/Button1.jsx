import React from 'react';
import Button from 'react-bootstrap/Button'



export default function Button1(props){
    return(
        <div>
            <Button size='lg' onClick={props.req}> {props.nom} </Button>
        </div>
    )
}