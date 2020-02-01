import styled from 'styled-components';

export const Select = styled.select`
    border: none;
    border-bottom: 1px solid #d3d3d3;
    background-color: transparent;
    width: 108%;
    border-radius: 10px;
    color: #fff;
    padding: 1em;
    margin-bottom: 2em;
    
    &:disabled{
        color: grey;
    }

    option {
        color: #000;
    }
`;