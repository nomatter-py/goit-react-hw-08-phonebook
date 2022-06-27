import styled from 'styled-components';

export const ContactListComponent = styled.ul`
width: 500px; `;

export const ContactItem = styled.li`
    display: flex;
    align-items: center;
    justify-content:space-between;
    margin-bottom: ${p => p.theme.space[4]}px;
`;