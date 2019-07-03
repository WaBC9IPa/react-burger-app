import React from "react";


import classes from "./Order.css";

const order = (props) => {

    const ingredients = [];

    for(let ingredient in props.ingredients) {
        ingredients.push(<li key={ingredient}>{ingredient} ({props.ingredients[ingredient]})</li>);
    }
    

    return (
        <div className={classes.Order} >
            <p>Ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    );
}

export default order;