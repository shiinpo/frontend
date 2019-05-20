import * as React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';
import Form from '../Form';
import { IAppState } from '../../../store/Store';
import { authReducer } from '../reducer';
import { Redirect } from 'react-router';
export interface IAppProps {
  login: any,
  jwt: boolean,
}

const Login = (props:IAppProps) =>  {

  return props.jwt 
    ? <Redirect to="/category"/>  
    :(
      <>
        <h1>Login</h1>
        <Form onSubmit={props.login}/>
      </>
    );
}

const mapStateToProps = (state:IAppState) => ({jwt: state.auth.jwt})

// Object of action creators
const mapDispatchToProps = {
  login,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
