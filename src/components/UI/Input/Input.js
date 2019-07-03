import React from "react";

import classes from "./Input.css";


const input = (props) => {

    let inputElement;
    let validationError;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.Danger}>Please enter a valid value!</p>
    }


    switch (props.elementType) {
        case("input"):
            inputElement = <input 
            className={inputClasses.join(" ")} 
            {...props.elementConfig}
            onChange={props.changed} 
            value={props.value} />;
            break;
        case ("textarea"):
            inputElement = <textarea 
            className={inputClasses.join(" ")} 
            {...props.elementConfig}
            onChange={props.changed} 
            value={props.value} />
            break;
        case ("select"):
            inputElement = (
            <select
                className={inputClasses.join(" ")}
                value={props.value}
                onChange={props.changed}
                >
                {props.elementConfig.options.map(option => {
                    return (
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    );
                })}
            </select>);
            break;
        default:
            inputElement = <input
            onChange={props.changed} 
            className={inputClasses.join(" ")} 
            {...props.elementConfig} 
            value={props.value} />
    }


    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;