import * as React from 'react';
import '../App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import CategoryList from '../containers/CategoryList';

const App: React.SFC<{}> = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={CategoryList} exact/>
      </Switch>
    </>
  );
};

export default App;