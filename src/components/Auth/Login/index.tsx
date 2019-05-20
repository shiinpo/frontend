import * as React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import Form from './Form';
export interface IAppProps {
  login: any
}

const Login = (props:IAppProps) =>  {

  return (
    <>
      <Form login={props.login}/>
    </>
  );
}

// Object of action creators
const mapDispatchToProps = {
  login,
}

export default connect(null, mapDispatchToProps)(Login);
