import React from 'react';
import { Redirect } from 'react-router-dom';

interface IProps {
    location: any,
}

const RequireAuthHOC = <P extends object>(Component: React.ComponentType<P>) => {
    class RequireAuthentication extends React.Component<P & IProps> {
        render() {
            const token = localStorage.getItem('token');
            return token ? <Redirect to="/category" push/> : <Component {...this.props as P}/>
        }
    };

    return RequireAuthentication;
}


export default RequireAuthHOC;


