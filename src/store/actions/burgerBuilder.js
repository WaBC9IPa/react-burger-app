import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingredient) => {
    return {
        type: actionTypes.ADD_INGREDIENT, 
        ingredientName: ingredient
    };
};

export const removeIngredient = (ingredient) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT, 
        ingredientName: ingredient
    };
};

export const fetchIngredientsFailed = (err) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
        error: err
    };
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://burgerreact-bf432.firebaseio.com/ingredients.json")
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(err => {
            dispatch(fetchIngredientsFailed(err))
        });
    };
};