import React from 'react';
import illustration from '../../assets/illustration-intro.png';
import './hero.css';
import { ButtonLinkContainer } from '../../components/ButtonLinkContainer';
import { Link } from 'react-router-dom';

export const Hero = () => {

    return (
        <div className="hero">
            <img className="illustration-intro" src={illustration} alt="All your files" />
            <h1>All Your files in one secure location, accessible anywhere.</h1>
            <p>Fylo stores all your files in one secure location. Access them wherever you need them,
                share and collaborate with friends, family and co-workers.
            </p>
            <ButtonLinkContainer ><Link to="/signin">Get Started</Link></ButtonLinkContainer>
        </div>
    )
}