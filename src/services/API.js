import axios from 'axios';
const contactsAPI = axios.create({
  baseURL: 'https://63cfcd701098240437866cc7.mockapi.io/contacts/',
});

export const getContacts = async () => {
  const { data } = await contactsAPI.get();
  return data;
};

export const deleteContact = async id => {
  const { data } = await contactsAPI.delete(id);
  return data;
};

export const addContact = async contact => {
  const { data } = await contactsAPI.post('', contact);
  return data;
};
