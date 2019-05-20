import * as React from 'react';
import '../App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import Category from './Category';
import Login from './Auth/Login';
import Landing from './Landing';
import RequireAuth from './Auth/RequireAuth'
import RequireNotAuth from './Auth/RequireNotAuth'
import NavigationBar from './NavigationBar';
import Register from './Auth/Register';


const App: React.SFC<{}> = (props:any) => {
  console.log(props);
  const AuthCategory = RequireAuth(Category);

  const NotAuthLogin = RequireNotAuth(Login);
  const NotAuthRegister = RequireNotAuth(Register);
  return (
    <>
      <NavigationBar />
      <Switch>
        {/* Landing and Auth routes */}
        <Route path="/" component={Landing} exact/>
        <Route path="/login" component={NotAuthLogin} exact/>
        <Route path="/Register" component={NotAuthRegister} exact/>
        
        {/* Protected Routes */}
        <Route path="/category" component={AuthCategory} exact/>
      </Switch>
    </>
  );
};

export default App;