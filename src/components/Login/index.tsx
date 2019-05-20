import * as React from 'react';
import { connect } from 'react-redux';
import { login } from '../Auth/actions';
import Form from './Form';
export interface IAppProps {
}

const Login = (props:any) =>  {

  const loginUserCall = (user:string, pass:string) => props.loginUser(user, pass)

  return (
    <>
      <Form login={loginUserCall}/>
    </>
  );
}

// Object of action creators
const mapDispatchToProps = {
  loginUser: login,
}

export default connect(null, mapDispatchToProps)(Login);
