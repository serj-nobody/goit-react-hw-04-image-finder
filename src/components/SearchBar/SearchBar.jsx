import { useState } from "react";
import PropTypes from 'prop-types';
import css from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa';
import { toast } from "react-toastify";



export function SearchBar({onSearchSubmit}) {
  const [searchQuery, setSearchQuery] = useState('');

  const onInputChange = (event) => {
    setSearchQuery(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    
    if (searchQuery.trim() === '') {
      toast.error('Please enter your search query');
      return;
    }

    onSearchSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <FaSearch size="16px"/>
        </button>

        <input
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={onInputChange}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
}

