import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authToken = localStorage.getItem("authToken");

  axios.interceptors.request.use(
    (config) => {
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <Route
      {...rest}
      render={(props) =>
        authToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
