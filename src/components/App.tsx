import * as React from 'react';
import '../App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import Category from './Category';

const App: React.SFC<{}> = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={Category} exact/>
      </Switch>
    </>
  );
};

export default App;