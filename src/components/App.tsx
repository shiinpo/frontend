import * as React from 'react';
import '../App.css';

import CategoryList from '../containers/CategoryList';

const App: React.SFC<{}> = () => {
  return (
    <>
      <h1>Exercise Categories</h1>
      <CategoryList />
    </>
  );
};

export default App;