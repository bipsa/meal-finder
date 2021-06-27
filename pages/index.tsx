import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRandomMeal, selectRecipes, setRecipes, 
  selectLastHomeUpdate } from '../recipes/slices';
import { Logo, Hero, Page, Card, SearchButton } from '../components';
import { MAX_RANDOM_RECIPES, FLUSH_CACHE } from '../recipes/variables';

const Index = () => {

  const dispatch = useDispatch();
  const recipies = useSelector(selectRecipes);
  const lastUpdate = useSelector(selectLastHomeUpdate);

  useEffect(() => {
    dispatch(getRandomMeal());
  }, [dispatch]);

  useEffect(() => {
    if(recipies.length < MAX_RANDOM_RECIPES) {
      dispatch(getRandomMeal());
    }
  }, [recipies, dispatch]);


  useEffect(() => {
    if(lastUpdate){
      if((Date.now() - lastUpdate) > FLUSH_CACHE) {
        if(navigator.onLine && recipies.length === MAX_RANDOM_RECIPES) {
          dispatch(setRecipes([]));
        }
      }
    }
  }, [dispatch, recipies, lastUpdate]);

  return (
    <Page>
      <Hero images={['/assets/images/home-background.jpg']}>
        <Logo className='recipe-logo' />
      </Hero>
      <div className='page-body'>
        <div className='page-wrapper'>
          <h2>Recipes of the day</h2>
          <ul className='list-of-recipes'>
            {
              recipies.map((recipe, index) => {
                return (
                  <li>
                    <Card key={`${recipe.idMeal}-${index}`} recipe={recipe} />
                  </li>
                )
              })
            }
          </ul>
          <SearchButton />
        </div>
      </div>
    </Page>
  )
};

export default Index;