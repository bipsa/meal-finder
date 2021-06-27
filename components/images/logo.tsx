import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import styles from  './sass/logo.module.scss';

type ImageProps = {
  size?: string | null | undefined,
  className?: string | null | undefined,
};

const Logo:FunctionComponent<ImageProps> = ({ size, className }) => {
  return (
    <Link href='/'>
      <a className={className}>
        <h1 className={styles['logo']}>
          <span>Recipe Finder</span>
        </h1>
        <style jsx>{`
          h1 {
            height: ${size};
            width: ${size};
            flex: 0 0 ${size};
          }
        `}
        </style>
      </a>
    </Link>
  );
};

Logo.propTypes = {
  size: PropTypes.string,
  className: PropTypes.string,
};
Logo.defaultProps = {
  size: '2.5em',
  className: ''
};

export default Logo;