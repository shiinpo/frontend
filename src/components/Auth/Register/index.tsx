import * as React from 'react';
import { connect } from 'react-redux';
import { register } from '../actions';
import Form from '../Form';
import { IAppState } from '../../../store/Store';
import { Redirect } from 'react-router';

export interface IAppProps {
  register: any,
  jwt: boolean,
}

const Register = (props:IAppProps) =>  {

  return props.jwt 
    ? <Redirect to="/category"/>  
    :(
      <>
          <h1>Register</h1>
          <Form onSubmit={props.register}/>
      </>
    );
}

const mapStateToProps = (state:IAppState) => ({jwt: state.auth.jwt})

// Object of action creators
const mapDispatchToProps = {
  register,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
