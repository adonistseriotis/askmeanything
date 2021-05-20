import React from "react";
import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../Services/auth";
import { isAuthenticated } from "../Services/auth";

const ProtectedRoute = ({path, component: Component, render, ...rest}) => {
    return (
        <Route
            {...rest}
            render={props => {
                if(!isAuthenticated())
                    return (
                        <Redirect
                          to={{
                              pathname: '/login',
                              state: {from: props.location}
                          }}
                        />
                    );
                return Component ? <Component {...props} /> : render(props);
            }}
        />
    );
};

export default ProtectedRoute;