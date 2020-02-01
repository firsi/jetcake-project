import React from 'react';
import logo from '../assets/logo.svg';
import { CardInfo } from '../components/CardInfo';
import { ReactComponent as AddressIcon } from '../assets/icon-location.svg';
import { ReactComponent as PhoneIcon } from '../assets/icon-phone.svg';
import { ReactComponent as EmailIcon } from '../assets/icon-email.svg';

export const Footer = () => {
    return(
        <footer>
            <img src={logo} alt="Fylo logo" />
            <CardInfo 
                icon={<AddressIcon />}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </CardInfo >
            <CardInfo 
                icon={<PhoneIcon />}
            >
                <span>+1-543-587-369</span>
            </CardInfo >
            <CardInfo 
                icon={<EmailIcon />}
            >
                <span>email@fylo.com</span>
            </CardInfo >
        </footer>
    )
}