import React, { Component } from "react";

import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import axios from "../../axios-orders";

export class BurgerBuilder extends Component {

    constructor(props){
        super(props);
        this.state = {
            purchasing: false
        };
    }

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState (updatedIngredients) {
        const ingredients = {
            ...updatedIngredients
        };
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((acc, current) => {
            return acc + current;
        });

        return sum > 0;

    }

    purchaseHandler = () => {
        if(!this.props.isAuth) {
            this.props.onSetRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
        else {
            this.setState({purchasing: true});

        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    }


    render(){
        const disableInfo = {
            ...this.props.ings
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        

        let burger = this.props.error ? <p>Ingredients can't be loaded.</p> : <Spinner />

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                    disabled={disableInfo} 
                    onAdd={this.props.onIngredientAdded} 
                    onRemove={this.props.onIngredientRemoved}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    price={this.props.price}
                    isAuth={this.props.isAuth}    
                    />
                </Aux>
            );

            orderSummary = <OrderSummary 
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={{...this.props.ings}}/>
        }

        if(this.state.loading) {
            orderSummary = <Spinner />;
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        error: state.burger.error,
        isAuth: !!state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredient) => dispatch(actionCreators.addIngredient(ingredient)),
        onIngredientRemoved: (ingredient) => dispatch(actionCreators.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));