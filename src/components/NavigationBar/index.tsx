import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../Auth/actions';
interface INavigationProps {
  logout: typeof logout,
  push: any,
}

const NavigationBar: React.FunctionComponent<INavigationProps> = (props:INavigationProps) => {
  const logout = () => {
    const { logout, push } = props;
    logout()
    push("/");
  }
  return (
      <>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/register">Register</Link>
        <div onClick={() => logout()}>Logout</div>
        <Link to="/category">Category</Link>
        <br />
        <Link to="/">Landing</Link>
        <br />
        <Link to="/progress">Progress</Link>
      </>
  );
};

const mapDispatchToProps = {
  logout,
}

export default connect(null, mapDispatchToProps)(NavigationBar);