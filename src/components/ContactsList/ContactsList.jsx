// import PropTypes from 'prop-types';
import css from './ContactsList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../redux/slices/contactsSlice';
import { getFilter } from '../../redux/slices/filterSlice';
import { useEffect } from 'react';
import {
  getContactsThunk,
  deleteContactThunk,
} from 'redux/thunks/contactsThunk';

export default function ContactsList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch]);

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  // const dispatch = useDispatch();
  const deleteContact = id => {
    return () => {
      dispatch(deleteContactThunk(id));
    };
  };

  const normalizeValue = value => value.toLowerCase().trim();
  const visibleContacts = contacts.filter(contact =>
    normalizeValue(contact.name).includes(normalizeValue(filter))
  );
  return (
    <>
      <ul className={css.list}>
        {visibleContacts.map(({ id, name, number }) => (
          <li className={css.item} key={id}>
            {name}, {number}
            <button
              className={css.btn}
              onClick={deleteContact(id)}
              type="button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

// ContactsList.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       number: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       id: PropTypes.string.isRequired,
//     }).isRequired
//   ).isRequired,
// };
