import * as React from 'react';
import { connect } from 'react-redux';
import { register } from '../actions';
import Form from '../Form';

export interface IAppProps {
  register: any
}

const Register = (props:IAppProps) =>  {

  return (
    <>
        <h1>Register</h1>
        <Form onSubmit={props.register}/>
    </>
  );
}

// Object of action creators
const mapDispatchToProps = {
  register,
}

export default connect(null, mapDispatchToProps)(Register);
