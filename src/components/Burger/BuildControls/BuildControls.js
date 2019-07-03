import React from "react";

import classes from "./BuildControls.css"
import Control from "./Control/Control";



const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}$</strong></p>
        {controls.map((el) => (
            <Control disabled={props.disabled[el.type]} key={el.label} type={el.type} label={el.label} onAdd={() => props.onAdd(el.type)} onRemove={() => props.onRemove(el.type)}/>
        ))}
        <button disabled={!props.purchasable} 
        className={classes.OrderButton}
        onClick={props.ordered}>
            {props.isAuth ? "ORDER NOW!" : "SIGN UP TO ORDER!"}
        </button>
    </div>
);

export default buildControls;