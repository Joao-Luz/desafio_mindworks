import React, {useState} from "react";
import {Alert} from "react-bootstrap"

export default function ErrorNotice(props) {
    const [show, ] = useState(true);

    if (show) {
        return (
        <Alert variant="danger" onClose={props.clearError} dismissible>
            {props.message}
        </Alert>
        );
    }

    return (
        <div className="error-notice">
        <span>{props.message}</span>
        <button onClick={props.clearError}>X</button>
        </div>
  );
}