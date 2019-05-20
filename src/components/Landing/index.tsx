import * as React from 'react';
import { Link } from 'react-router-dom';

interface ILandingProps {
}

const Landing: React.FunctionComponent<ILandingProps> = (props) => {
  return (
      <>
        <h1>Landing</h1>
        <Link to="/login">Login</Link>
      </>
  );
};

export default Landing;