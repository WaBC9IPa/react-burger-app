import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.css";

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem exact closed={props.closed} link="/">Burger Builder</NavigationItem>
            {props.isAuthenticated ? <NavigationItem closed={props.closed} link="/orders" >Orders</NavigationItem> : null}
            {props.isAuthenticated ? <NavigationItem exact closed={props.closed} link="/logout">Logout</NavigationItem> : 
            <NavigationItem exact closed={props.closed} link="/auth">Auth</NavigationItem>}
        </ul>
    );
};

export default navigationItems;