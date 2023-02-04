import { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({ search: '' });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevSearch => {
      return { ...prevSearch, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ search: '' });
  };

  const { search } = state;

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <span className={styles.label}>Search</span>
        </button>
        <input
          className={styles.input}
          value={search}
          type="text"
          name="search"
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
