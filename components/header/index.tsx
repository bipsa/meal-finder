import React, { FunctionComponent, 
  useRef, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';

import styles from  './sass/header.module.scss';
import { LikeButton } from '../buttons';
import Link from 'next/link';

type OnTextChanged = (keyword: string) => void;

type HeaderProps = {
  search?: boolean;
  onKeywordChanged?: OnTextChanged;
};

const Header:FunctionComponent<HeaderProps> = ({ search, onKeywordChanged }) => {

  const searchField = useRef<HTMLInputElement>();

  useEffect(() => {
    if(search) {
      setTimeout(() => {
        if (searchField) {
          searchField.current.focus();
        }
      }, 500);
    }
  }, [search, searchField]);

  return (
    <div className={styles.header}>
      <div className='page-wrapper'>
        <div className={styles['header-left']}>
          <Link href='/'>
            <a>
              <FontAwesomeIcon icon={faChevronCircleLeft} />
            </a>
          </Link>
        </div>
        <div className={styles['header-title']}>
          {
            search &&
              <input placeholder='Find a meal' ref={searchField} type='text' name='search' onChange={() => {
                if(onKeywordChanged){
                  onKeywordChanged(searchField.current.value);
                }
              }} />
          }
        </div>
        <div className={styles['header-right']}>
          <LikeButton liked={false} onSelection={(state) => {
          }} />
        </div>
      </div>
    </div>
  );
};

Header.defaultProps = {
  search: false
};

export default Header;