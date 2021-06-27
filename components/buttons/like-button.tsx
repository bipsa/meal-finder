import React, { FunctionComponent, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faheartIcon } from '@fortawesome/free-regular-svg-icons';

import styles from  './sass/like-button.module.scss';

type OnSelection = (state: boolean) => void;

type LikeButtonProps = {
  liked: boolean;
  onSelection: OnSelection;
};

const LikeButton:FunctionComponent<LikeButtonProps> = ({ liked, onSelection }) => {

  const [isLiked, setIsLiked] = useState(liked);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  return (
    <a href='#' className={`${styles['like-button']}`} onClick={(event) => {
      event.preventDefault();
      onSelection(!isLiked);
      setIsLiked(!isLiked);
    }}>
      {
        isLiked?
          <FontAwesomeIcon icon={faHeart} />:
          <FontAwesomeIcon icon={faheartIcon} />
      }
    </a>
  );
};

LikeButton.propTypes = {
  liked: PropTypes.bool
};
LikeButton.defaultProps = {
  liked: false
};

export default LikeButton;