import React, { FunctionComponent, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from  './sass/hero.module.scss';

type HeroProps = {
  images: string[]
};

const Hero:FunctionComponent<HeroProps> = ({ children, images }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  useEffect(() => {
    if(images.length > 0) {
      setCurrentImage(images[currentIndex]);
    }
  }, [images, currentIndex]);


  return (
    <div className={styles.hero}>
      <div className={`${styles['image-wrapper']} current-image`}></div>
      { children }
      <style jsx>{`
        .current-image {
          background-image: url(${currentImage});
        }
      `}
      </style>
    </div>
  );
};

Hero.propTypes = {
  images: PropTypes.array,
};
Hero.defaultProps = {
  images: []
};

export default Hero;