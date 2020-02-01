import React from 'react';
import styled from 'styled-components';

export const CardInfo = ({children, icon}) => {
    const Address = styled.address`
        max-width: 350px;
        display: flex;
        margin-top: 2em;
        margin-right: 1em;
        margin-left: 1em;
        font-style: normal;
        
        div{
            padding-left: 1em;
        }
    `
    return (
        <Address>
            <span>{icon}</span>
            <div>{children}</div>
        </Address>
    )
}