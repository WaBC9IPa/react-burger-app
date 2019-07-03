import React, { Component } from 'react';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import { connect } from "react-redux";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {


  render() {

    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/"/>
      </Switch>
    );

    if(this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
        <Layout>
          {routes}
        </Layout>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    isAuth: !!state.auth.token
  }
};

export default withRouter(connect(mapStateToProps)(App));
