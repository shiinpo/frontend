import * as React from 'react';
import '../App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import Category from './Category';
import Login from './Login';

const App: React.SFC<{}> = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Category} exact/>
        <Route path="/login" component={Login} exact/>
      </Switch>
    </>
  );
};

export default App;