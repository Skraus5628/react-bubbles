import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={() =>{
                if (localStorage.getItem(`token`)) {
                    return <Component />;
                } else {
                    return <Redirect to="/" />;
                }
            }}
        />
    );
};


export default PrivateRoute;

// task 1 step 2: Created private route that checks if a token is passed in local storage 
// and directs or redirects based on auth token present