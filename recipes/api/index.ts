import axios from 'axios';

/**
 * Convenient object to keep the request a part of any client-specific library. 
 * It also makes Axios from a strong dependency to easy-to-change dependency into the project. 
 */

export const baseURL = 'https://www.themealdb.com/api/json/v1/1/';

export const getRandomMealRequest = async () => {
  return await axios.get(`${baseURL}random.php`);
};

export const findAMealRequest = async (query: string) => {
  return await axios.get(`${baseURL}search.php?s=${query}`);
};

export const getMealDetailRequest = async (id: string) => {
  return await axios.get(`${baseURL}lookup.php?i=${id}`);
};