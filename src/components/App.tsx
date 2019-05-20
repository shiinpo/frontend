import * as React from 'react';
import '../App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import Category from './Category';
import Login from './Login';
import Landing from './Landing';
import RequireAuth from './Auth/RequireAuth'
import RequireNotAuth from './Auth/RequireNotAuth'


const App: React.SFC<{}> = (props:any) => {
  console.log(props);
  const AuthCategory = RequireAuth(Category);

  const NotAuthLogin = RequireNotAuth(Login);
  return (
    <>
      <Switch>
        <Route path="/" component={Landing} exact/>
        <Route path="/category" component={AuthCategory} exact/>
        <Route path="/login" component={NotAuthLogin} exact/>
      </Switch>
    </>
  );
};

export default App;