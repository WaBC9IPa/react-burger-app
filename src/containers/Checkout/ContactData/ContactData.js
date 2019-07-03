import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner"

import classes from "./ContactData.css";
import axios from "../../../axios-orders";

import { withRouter } from "react-router-dom";
import Input from "../../../components/UI/Input/Input"
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";

import * as actionCreators from "../../../store/actions/index";

import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP Code"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your E-mail"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            devileryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "fastest"},
                        {value: "cheapest", displayValue: "cheapest"}
                    ]
                },
                value: "fastest",
                valid: true,
                validation: {

                }
            }
        },
        formIsValid: false
    };

    orderHandler = (e) => {
        e.preventDefault();

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            orderData: formData,
            price: this.props.price,
            userId: this.props.userId
        };

        this.props.onOrderBurger(order, this.props.token);

    }

    inputChangedHandler = (event, identifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[identifier], {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, this.state.orderForm[identifier].validation)
        }); 

        const updatedOrderForm = updateObject(this.state.orderForm, {[identifier]: updatedFormElement});


        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render(){

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map((formElement) => {
                    return (
                        <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        />
                    );
                })}
                <Button disabled={!this.state.formIsValid} btnType="Success">Order</Button>
            </form>

        );

        if(this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios)));