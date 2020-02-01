import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Homepage } from '../pages/Homepage';
import   Signin  from '../pages/Signin';
import   Signup  from '../pages/Signup';
import { Profile } from '../pages/Profile';
import { PrivateRoutes } from '../Routes/PrivateRoutes';

export const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route path="/signin">
                    <Signin />
                </Route>
                <Route path="/signup">
                    <Signup />
                </Route>
                <PrivateRoutes component={Profile} path="/profile" />
            </Switch>
        </main>
    )
}