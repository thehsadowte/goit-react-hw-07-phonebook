import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { addContact, getContacts } from 'redux/slices/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const normalizeValue = value => value.toLowerCase().trim();

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const exist = contacts.some(
      contact => normalizeValue(contact.name) === normalizeValue(name)
    );

    if (exist) {
      Notify.info('This contact is already exist');
      return;
    }
    dispatch(
      addContact({
        name,
        number,
        id: nanoid(),
      })
    );
    form.reset();
  };

  return (
    <div className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1>PhoneBook</h1>
        <div className="wrapper">
          <label>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button type="submit">Add Contact</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
