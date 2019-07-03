import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./Toolbar.css";

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div className={classes.MobileOnly} onClick={props.opened}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav>
        </header>
    );
};

export default toolbar;