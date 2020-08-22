import React from "react";
import {Card} from "react-bootstrap"

import history from '../history';

export default function User({user, href, ...props}) {
    
    const edit = () => {history.push(href)}

    return (
        <div {...props}>
            <Card className='thick-border' style={{ maxWidth: '500px'}}>
                <Card.Body>
                    <Card.Title><a className='link' onClick={edit}>{user.name + " " + user.last_name}</a></Card.Title>
                    <Card.Subtitle>{user.job}</Card.Subtitle>
                    <Card.Text>{user.email}</Card.Text>
                </Card.Body>            
            </Card>
        </div>
  );
}