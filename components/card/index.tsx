import React, { FunctionComponent, 
  useRef, useEffect } from 'react';

import Link from 'next/link';

import styles from  './sass/card.module.scss';
import { Recipe } from '../../recipes/types';

import { useIsVisible, loadImage } from '../images';

type CardProps = {
  recipe?: Recipe | null,
};

const Card:FunctionComponent<CardProps> = ({ recipe }) => {

  const currentCard = useRef<HTMLDivElement>();
  const imageFrame = useRef<HTMLDivElement>();
  const { observer, setElements, entries } = useIsVisible({
    threshold: 0,
    root: currentCard.current
  });

  useEffect(() => {
    entries.forEach(element => {
      if (element.isIntersecting) {
        if(recipe.strMealThumb){
          loadImage(recipe.strMealThumb, (imageLoaded, error) => {
            if(!error) {
              try {
                imageFrame.current.style.backgroundImage = `url(${imageLoaded.src})`;
                element.target.classList.add('loaded');
              } catch (error) {
              }
            }
          });
        }
      } else {
        imageFrame.current.style.backgroundImage = null;
      }
    })
  }, [entries, observer, imageFrame]);

  useEffect(() => {
    setElements([currentCard.current]);
  }, [setElements]);


  return (
    <Link href={`/recipes/${recipe.idMeal}/`}>
      <a className={styles.card}>
        <div ref={currentCard} className={styles['card-wrapper']}>
          <div className={styles['card-body']}>
            <h3>{recipe.strMeal}</h3>
          </div>
          <div ref={imageFrame} className={styles['image-frame']}></div>
        </div>
      </a>
    </Link>
  );
};

Card.defaultProps = {
  recipe: null
};

export default Card;