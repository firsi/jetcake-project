import React from 'react';
import styled from 'styled-components';
import illustration from '../assets/illustration-stay-productive.png';

export const Productivity = () => {
    const Section = styled.section`
        text-align: center;
        img{
            max-width: 100%;
        }
        a{
            text-decoration: underline;
            color: hsl(176, 68%, 64%)
        }
        p,h2, div{
            text-align: left;
        }
    `;
    return(
        <Section className="productivity">
            <img alt="stay productive" src={illustration} />
            <div className="productivity-content">
                <h2 className="medium-font-size">Stay Productive, whereever you are</h2>
                <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <br /><br />

                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident.
                </p>
            </div>
        </Section>
    )
}