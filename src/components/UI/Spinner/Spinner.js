import React from "react";
import classes from "./Spinner.css";

const spinner = () => {
    return (
        <div className={classes.Container}><div className={classes.Spinner}><div></div><div></div><div></div><div></div></div></div>
    );
};

export default spinner;