import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useCurrentUserValue } from '../context/Auth-context';
import app from '../base';

export const Header = () => {
    const {currentUser} = useCurrentUserValue();
    const navigation = () => {
        return(
            <ul className="navigation">
                    <li className="nav-item"><Link to="/signin" className="nav-link" >Sign in</Link></li>
            </ul>
        )
    }

    const privateNavigation = () => {
        return(
            <ul className="navigation">
                    <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                    <li className="nav-item"><button className="nav-link btn-link" onClick={handleSignout}>Sign out</button></li>
            </ul>
        )
    }

    const handleSignout = () => {
        app.auth()
        .signOut()
        .then(() => {
            return <Redirect to="/" />
         })
        .catch(error => console.log(error));
    }
    return (
        <header>
            <div className="logo">
                <Link to="/" ><img src={logo} alt="fylo logo" /></Link>
            </div>
            <nav>
                {currentUser ? privateNavigation() : navigation()}
            </nav>
        </header>
    )
}