import * as React from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom';

import Category from './Category';
import Progress from './Progress';
import Login from './Auth/Login';
import Landing from './Landing';
import RequireAuth from './Auth/RequireAuth'
import RequireNotAuth from './Auth/RequireNotAuth'
import NavigationBar from './NavigationBar';
import Register from './Auth/Register';


const App: React.SFC<{}> = (props:any) => {
  console.log(props);
  const AuthCategory = RequireAuth(Category);
  const AuthProgress = RequireAuth(Progress);

  const NotAuthLogin = RequireNotAuth(Login);
  const NotAuthRegister = RequireNotAuth(Register);

  return (
    <>
      <NavigationBar push={props.history.push}/>
      <Switch>
        {/* Landing and Auth routes */}
        <Route path="/" component={Landing} exact/>
        <Route path="/login" component={NotAuthLogin}/>
        <Route path="/register" component={NotAuthRegister}/>
        
        {/* Protected Routes */}
        <Route path="/category" component={AuthCategory}/>
        <Route path="/progress" component={AuthProgress}/>
      </Switch>
    </>
  );
};

export default App;