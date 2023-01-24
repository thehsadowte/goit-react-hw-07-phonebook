import css from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { setFilter } from 'redux/slices/filterSlice';

export default function Filter() {
  const dispatch = useDispatch();
  const filterHandler = e => {
    dispatch(setFilter(e.target.value));
  };
  return (
    <>
      <h2 className={css.title}>Contacts</h2>
      <label className={css.label}>
        Enter search query
        <input
          className={css.input}
          type="text"
          name="filter"
          onChange={e => filterHandler(e)}
        />
      </label>
    </>
  );
}
