import React from 'react';
import styled from 'styled-components';


export const Card = ({children, icon, title}) => {
    const CardContainer = styled.div`
        text-align: center;
        margin-top: 20px;
        margin-bottom: 80px;
        max-width: 350px;
        margin-right: auto;
        margin-left: auto;
    `;

    return(
        <CardContainer>
            {icon}
            <h2 className="medium-font-size">{title}</h2>
            <p>{children}</p>
        </CardContainer>
    )
}