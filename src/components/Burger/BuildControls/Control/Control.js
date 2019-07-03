import React from "react";

import classes from "./Control.css"

const control = (props) => (
    <div className={classes.Control}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} disabled={props.disabled} onClick={props.onRemove}>Less</button>
        <button className={classes.More} onClick={props.onAdd}>More</button>
    </div>
);

export default control;