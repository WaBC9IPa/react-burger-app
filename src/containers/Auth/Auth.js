import React from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router-dom";

import { connect } from "react-redux";

import * as actionCreators from "../../store/actions";

import classes from "./Auth.css";

import { updateObject, checkValidity } from "../../shared/utility";

function outputErrorMessage(error){
    if(error === "INVALID_PASSWORD" || error === "EMAIL_NOT_FOUND") {
        return "You entered invalid email or password";
    }

    if(error === "EMAIL_EXISTS") {
        return "This email is already signed up";
    }

    if(error.indexOf("TOO_MANY_ATTEMPTS_TRY_LATER") !== -1 )  {
        return "We have blocked all request from this device due to unusual activity. Try later.";
    };

    return "An error occured";
}

class Auth extends React.Component {
    
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "E-mail address.."
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password.."
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: true
    }

    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath();
        };
    };


    inputChangedHandler = (event, identifier) => {

        const updatedFormElement = updateObject(this.state.controls[identifier], {
            value: event.target.value,
            touched: true,
            valid: checkValidity(event.target.value, this.state.controls[identifier].validation)
        }); 

        const updatedControls = updateObject(this.state.controls, {[identifier]: updatedFormElement});


        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }

        this.setState({controls: updatedControls, formIsValid: formIsValid});
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
        });
    };

    render() {

        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        };

        let error;
        let form = formElementsArray.map(formElement => {
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
        });

        if(this.props.loading) {
            form = <Spinner />;
        }

        if(this.props.error) {
            error = <div className={classes.Danger}>{outputErrorMessage(this.props.error.message)}</div>
        }

        let authRedirect = null;
        if(this.props.token) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }
        
        return (
            <div className={classes.Auth} >
                {authRedirect}
                <h2>{this.state.isSignUp ? "SIGN UP" : "SIGN IN"}</h2>
                <form onSubmit={this.submitHandler} >
                    {form}
                    <Button btnType="Success" disabled={!this.state.formIsValid} >
                        SUBMIT
                    </Button>
                </form>
                {error}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
                </Button>
            </div>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actionCreators.setAuthRedirectPath("/"))
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
        building: state.burger.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth); 