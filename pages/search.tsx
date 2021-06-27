import { ReactElement, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/dist/client/router';

import { selectFoundRecipes, findAMeal } from '../recipes/slices';
import { Hero, Page, SearchButton, Header } from '../components';

import styles from  './sass/detail.module.scss';
import Link from 'next/link';

const SearchPage = () => {
  const dispatch = useDispatch();
  const found = useSelector(selectFoundRecipes);

  return (
    <Page>
      <Header onKeywordChanged={(keyword) => {
        console.log(keyword);
        const meal = keyword.trim();
        if(meal.length > 5) {
          dispatch(findAMeal(meal));
        }
      }} search />
      <div className='page-body'>
        <div className='page-wrapper'>
          <ul className='search-results'>
          {
            found &&
              found.map((meal) => {
                return <li key={meal.idMeal}>
                  <Link href={`/recipes/${meal.idMeal}`}>
                    <a>{meal.strMeal}</a>
                  </Link>
                </li>
              })
          }
          </ul>
        </div>
      </div>
    </Page>
  )
};

export default SearchPage;