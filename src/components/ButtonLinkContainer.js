import styled from 'styled-components';

export const ButtonLinkContainer = styled.div`
    a{
        display: inline-block;
        padding: 1em;
        color: white;
        font-weight: 700;
        background: linear-gradient(to left, hsl(176, 68%, 64%),hsl(198, 60%, 50%));
        border-radius: 50px;
        width: 200px;
        cursor: pointer;
    }
    a:hover{
        color: #fff
        background-color: hsl(198, 60%, 50%);
    }
`;