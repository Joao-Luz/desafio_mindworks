import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Context } from './Context/AuthContext';

import Login from './Components/Login';
import Register from './Components/Register';
import Users from './Components/Users';
import Edit from './Components/Edit';
import Search from './Components/Search';

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return null;
  }

  else if (isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute exact path="/register" component={Register} />
      <CustomRoute isPrivate exact path="/users" component={Users} />
      <CustomRoute isPrivate path="/users" component={Edit} />
      <CustomRoute isPrivate exact path="/search" component={Search} />
    </Switch>
  );
}