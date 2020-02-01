import styled from 'styled-components';

export const Input = styled.input`
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus{
        border: none;
        border-bottom: 1px solid #d6d5d5;
        -webkit-text-fill-color: #d6d5d5;
        -webkit-box-shadow: 0 0 0px 1000px #1c2e35 inset;
        background: transparent;
        transition: background-color 5000s ease-in-out 0s;
    }
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #d6d5d5;
    color: #fff;
    height: 25px;
    width: 100%;
    border-radius: 10px;
    padding: 1em;
    

`;