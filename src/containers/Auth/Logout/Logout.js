import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actionCreators from "../../../store/actions";

class Logout extends React.Component {

    componentDidMount() {
        if(this.props.token) {
            this.props.onLogOut();
            this.props.history.push("/");
        };
    }

    render () {
        return <Redirect to="/" />;
    }
};

const mapStateToProps = state => {
    return {
        token: state.auth.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(actionCreators.logOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);