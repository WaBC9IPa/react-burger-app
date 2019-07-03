import React, { Component } from "react";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withError from "../../hoc/withErrorHandler/withErrorHandler";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

import * as actionCreators from "../../store/actions";

class Orders extends Component {

    state = {
        orders: null,
        loading: true
    }

    componentDidMount(){
        if(this.props.token) {
            this.props.onFetchOrders(this.props.token, this.props.userId);
        }
    }
    

    render(){

        let orders;



        orders = <Spinner />

        if(!this.props.loading) {
            orders = this.props.orders.map((order, i) => {
                return (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price.toFixed(2)}   
                    />
                );
            });
        }

        return (
            <div>
                {!this.props.token ? <Redirect to="/" /> : null}
                {orders}
            </div>

        );
    }
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actionCreators.fetchOrders(token, userId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withError(Orders, axios));