import styled from 'styled-components';

export const ContactItem = styled.li`
    display: flex;
    align-items: center;
    justify-content:space-between;
    margin-bottom: ${p => p.theme.space[4]}px;
    padding: 10px;
    border: 1px solid grey;
    border-radius: 4px;
`;

export const Button = styled.button`
display: flex;
padding: 10px;
color: #fff;
background-color: ${p => p.theme.colors.primary};
border-radius: 5px;
border: none;`;