import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CompaniesList from "../companies/CompaniesList"
import CompanyDetails from "../companies/CompanyDetails"
import Home from "../home/Home";
import JobsList from "../jobs/JobList";
import NewUserForm from "../auth/NewUserForm";
import LoginForm from "../auth/LoginForm";
import UpdateUserForm from "../profile/UpdateUserForm";
import PrivateRoute from "./PrivateRoute";

const Routes = ({login, signup}) => {
  return (
    <Switch>
      <Route exact path="/">
          <Home></Home>
      </Route>
      <PrivateRoute exact path="/companies">
          <CompaniesList/>
      </PrivateRoute>
      <PrivateRoute exact path="/companies/:handle">
          <CompanyDetails></CompanyDetails>
      </PrivateRoute>
      <PrivateRoute exact path="/jobs">
          <JobsList></JobsList>
      </PrivateRoute>
      <Route exact path="/signup">
          <NewUserForm signup={signup}></NewUserForm>
      </Route>
      <Route exact path="/login">
          <LoginForm login={login}></LoginForm>
      </Route>
      <PrivateRoute exact path="/profile">
          <UpdateUserForm></UpdateUserForm>
      </PrivateRoute>
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
