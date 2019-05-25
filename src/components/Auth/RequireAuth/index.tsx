import React from 'react';
import jwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IDecodedToken, getUserInfo } from '../actions'
import { IAppState } from '../../../store/Store';

interface IProps {
    location: any,
    id: number
    getUserInfo: typeof getUserInfo
}

const RequireAuthHOC = <P extends object>(Component: React.ComponentType<P>) => {
    class RequireAuthentication extends React.Component<any> {
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

                if (this.props.id === 0) {
                    this.props.getUserInfo();
                }

                const { location, id, getUserInfo, ...newProps } = this.props; 

                return <Component {...newProps as P}/>
            }

            return <Redirect to="/login" push/>
        }
    };

    const mapStateToProps = (state:IAppState) => ({ id: state.auth.id });
    const mapDispatchToProps = { getUserInfo };
    
    return connect(mapStateToProps, mapDispatchToProps)(RequireAuthentication);
}


export default RequireAuthHOC;


