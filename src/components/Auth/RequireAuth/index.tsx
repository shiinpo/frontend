import React from 'react';
import jwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import { IDecodedToken, setUserInfo } from '../actions'

interface IProps {
    location: any,
}

const RequireAuthHOC = <P extends object>(Component: React.ComponentType<P>) => {
    class RequireAuthentication extends React.Component<P & IProps> {
        render() {
            // const { location }= this.props;
            const token = localStorage.getItem('token');

            if (token) {
                const decoded:IDecodedToken = jwtDecode(token);

                if (Date.now() / 1000 > decoded.exp) {
                    localStorage.removeItem("token")
                    return <Redirect to="/login" push/>
                }

                if (!decoded.username) {
                    localStorage.removeItem("token")
                    return <Redirect to="/login" push/>
                }

                return <Component {...this.props as P}/>
            }

            return <Redirect to="/login" push/>
        }
    };

    return RequireAuthentication;
}


export default RequireAuthHOC;


