import React, { FunctionComponent } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from  './sass/search-button.module.scss';
import Link from 'next/link';

type SearchButtonProps = {
};

const SearchButton:FunctionComponent<SearchButtonProps> = () => {
  return (
    <Link href='/search'>
      <a className={`round-button ${styles['search-button']}`}>
        <FontAwesomeIcon icon={faSearch} />
      </a>
    </Link>
  );
};

export default SearchButton;