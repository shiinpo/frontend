import * as React from 'react';
import { Link } from 'react-router-dom';

interface INavigationProps {
}

const NavigationBar: React.FunctionComponent<INavigationProps> = (props) => {
  return (
      <>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>
        <div onClick={() => localStorage.removeItem("token")}>Logout</div>
        <Link to="/category">Category</Link>
        <br />
        <Link to="/">Landing</Link>
      </>
  );
};

export default NavigationBar;