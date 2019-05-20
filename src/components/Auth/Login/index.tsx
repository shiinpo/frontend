import * as React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import Form from '../Form';
export interface IAppProps {
  login: any
}

const Login = (props:IAppProps) =>  {

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={props.login}/>
    </>
  );
}

// Object of action creators
const mapDispatchToProps = {
  login,
}

export default connect(null, mapDispatchToProps)(Login);
