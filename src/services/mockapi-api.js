import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'https://62ef9d6e57311485d124defe.mockapi.io/api/contacts/',
});

export const getContacts = async () => {
  const response = await customAxios.get();
  return response.data;
};

export const deleteContact = async id => {
  const response = await customAxios.delete(`/${id}`);
  const data = await response.data;
  return data;
};

export const addContact = async ({ name, number }) => {
  let contact = {
    name: name,
    phone: number,
  };

  const response = await customAxios.post('/', contact);
  const data = response.data;

  return data;
};
