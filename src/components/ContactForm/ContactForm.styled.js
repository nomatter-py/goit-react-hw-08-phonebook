import styled from 'styled-components';

export const Input = styled.input`
position:relative;
color:${p => p.theme.colors.text};
`;



export const Button = styled.button`
padding: 10px;
color: #fff;
background-color: ${p => p.theme.colors.primary};
border-radius: 5px;
border: none;`;