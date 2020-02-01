import styled from 'styled-components';

export const Button = styled.button`
    border: none;
    padding: 1em;
    color: white;
    font-weight: 700;
    background: linear-gradient(to left, hsl(176, 68%, 64%),hsl(198, 60%, 50%));
    border-radius: 50px;
    width: ${props => props.width ? props.width : '200px'};
    cursor: pointer;
    
    &:hover{
        background: hsl(198, 60%, 50%);
    }

    &[disabled]{
        background: grey;
    }
`;