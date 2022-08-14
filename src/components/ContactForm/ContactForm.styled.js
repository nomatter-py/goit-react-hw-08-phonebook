import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    display: inline-block;
    min-width: 110px;
  }
`;

export const Input = styled.input`
  flex-grow: 1;
  flex-basis: 380px;
  color: ${p => p.theme.colors.text};
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 10px;
  color: #fff;
  background-color: ${p => p.theme.colors.primary};
  border-radius: 5px;
  border: none;
`;
