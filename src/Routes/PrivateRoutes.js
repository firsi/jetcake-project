import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCurrentUserValue } from '../context/Auth-context';

export const PrivateRoutes = ({component: RouteComponent, ...rest}) => {
    const {currentUser} = useCurrentUserValue();

    return(
     <Route
        {...rest}
        render={(routeProps) => 
            !!currentUser ? 
            <RouteComponent {...routeProps} /> : <Redirect exact to="/signin" />
        }
     />
 )
}