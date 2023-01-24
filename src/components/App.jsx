// import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export function App() {
  return (
    <div className={css.container}>
      <ContactForm />
      <Filter />
      <ContactsList />
    </div>
  );
}
