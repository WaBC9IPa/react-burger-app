import React from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.css";

import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})     
    };

    sideDrawerOpenedHandler = () => {
        this.setState((prev) => {
            return {
                showSideDrawer: !prev.showSideDrawer
            };
        })     
    };

    render(){
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} show={this.state.showSideDrawer} opened={this.sideDrawerOpenedHandler} />
                <SideDrawer isAuth={this.props.isAuthenticated} show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
    
};

const mapStateToProps = state => {
    return {
        isAuthenticated: !!state.auth.token
    };
};

export default connect(mapStateToProps)(Layout);