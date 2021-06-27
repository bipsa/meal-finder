import { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

import { getMealDetail, selectRecipe, setRecipe } from '../../recipes/slices';
import { Hero, Page, SearchButton, Header } from '../../components';

import styles from  './sass/detail.module.scss';

const RecipeDetail = () => {

  const dispatch = useDispatch();
  const detail = useSelector(selectRecipe);
  const router = useRouter();

  const normalizeInstructions = useCallback((instructions) => {
    const paragraphs = instructions.split('.');
    let resultParagraphs: ReactElement[] = [];
    paragraphs.forEach(element => {
      resultParagraphs.push(<p>{element}.</p>)
    });
    return resultParagraphs;
  }, []);

  useEffect(() => {
    dispatch(getMealDetail(router.query.id as string));
  }, [dispatch, router]);

  useEffect(() => {
    return () => {
      dispatch(setRecipe(null));
    }
  }, [dispatch]);

  return (
    <Page>
      <Header />
      {
        detail &&
        <>
          <Hero images={[detail.strMealThumb]} />
          <div className='page-body'>
            <div className='page-wrapper'>
              <h2>{detail.strMeal}</h2>
              <div className={styles['ingredients-wrapper']}>
                <h3>Ingredients</h3>
                <ul>
                  {
                    Array(20).join().split(',').map((_, index) => {
                      const ingredient = detail[`strIngredient${index+1}`];
                      const measure = detail[`strMeasure${index+1}`];
                      if(ingredient) {
                        if(ingredient.trim() !== '') {
                          return <li>{measure} {ingredient}</li>
                        }
                      }
                    })
                  }
                </ul>
                <h3>Instructions</h3>
                <div className={styles['instructions-wrapper']}>
                  {normalizeInstructions(detail.strInstructions)}
                </div>
              </div>
              <SearchButton />
            </div>
          </div>
        </> 
      }
    </Page>
  )
};

export default RecipeDetail;