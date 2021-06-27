import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomMealRequest, findAMealRequest, getMealDetailRequest} from '../api';
import { Recipe, RecipepState } from '../types';
import { MAX_RANDOM_RECIPES } from '../variables';

const initialState: RecipepState = {
  loaded: false,
  recipes: [],
  recipe: null,
  lastHomeUpdate: null,
  foundRecipes: []
};

/**
 * Asynchronous action to get random meals
 * @return method to be used for the reducer.
 */
 export const getRandomMeal = createAsyncThunk(
  'recipe/getRandomMeal',
  async (_, thunk) => {
    try {
      const meal = await getRandomMealRequest();
      if(meal.data) {
        return meal.data;
      }
    } catch (error) {
      //thunk.dispatch(errorAction());
      return thunk.rejectWithValue(error.response.data);
    }
  }
);

/**
 * Asynchronous action to get meal detail
 * @return method to be used for the reducer.
 */
 export const getMealDetail = createAsyncThunk(
  'recipe/getMealDetail',
  async (id: string, thunk) => {
    try {
      const meal = await getMealDetailRequest(id);
      if(meal.data) {
        return meal.data;
      }
    } catch (error) {
      //thunk.dispatch(errorAction());
      return thunk.rejectWithValue(error.response.data);
    }
  }
);


/**
 * Asynchronous action to find a meals
 * @return method to be used for the reducer.
 */
 export const findAMeal = createAsyncThunk(
  'recipe/findAMeal',
  async (query: string, thunk) => {
    try { 
      const meal = await findAMealRequest(query);
      if(meal.data) {
        return meal.data;
      }
    } catch (error) {
      //thunk.dispatch(errorAction());
      return thunk.rejectWithValue(error.response.data);
    }
  }
);


/**
 * Set of reducers and actions.
 */
const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setRecipe: (state, action) => {
      state.recipe = action.payload;
    },
    setLastHomeUpdate: (state, action) => {
      state.lastHomeUpdate = action.payload;
    },
    setFoundRecipes: (state, action) => {
      state.foundRecipes = action.payload;
    },
  },
  extraReducers: {
    [getRandomMeal.fulfilled.toString()]: (state, action) => {
      const meal = action.payload as { meals: Recipe[] };
      if(meal.meals.length > 0) {
        if (state.recipes.length < MAX_RANDOM_RECIPES) {
          state.lastHomeUpdate = Date.now();
          state.recipes.push(meal.meals[0]);
        }
      }
    },
    [getRandomMeal.pending.toString()]: () => {
    },
    [getRandomMeal.rejected.toString()]: (state, action) => {
    },
    [getMealDetail.fulfilled.toString()]: (state, action) => {
      const meal = action.payload as { meals: Recipe[] };
      if(meal.meals){
        if(meal.meals.length > 0) {
          state.recipe = meal.meals[0];
        }
      }
    },
    [getMealDetail.pending.toString()]: () => {
    },
    [getMealDetail.rejected.toString()]: (state, action) => {
    },
    [findAMeal.fulfilled.toString()]: (state, action) => {
      const meal = action.payload as { meals: Recipe[] };
      if(meal.meals.length > 0) {
        state.foundRecipes = meal.meals;
      }
    },
    [findAMeal.pending.toString()]: () => {
    },
    [findAMeal.rejected.toString()]: (state, action) => {
    }
    
  }
});

export const { setLoaded, setRecipes, 
  setRecipe, setLastHomeUpdate, setFoundRecipes } = recipeSlice.actions;

export const selectLoaded = (state: { recipes: RecipepState }) => {
  return state.recipes.loaded;
};

export const selectRecipes = (state: { recipes: RecipepState }) => {
  return state.recipes.recipes;
};

export const selectRecipe = (state: { recipes: RecipepState }) => {
  return state.recipes.recipe;
};

export const selectLastHomeUpdate = (state: { recipes: RecipepState }) => {
  return state.recipes.lastHomeUpdate;
};

export const selectFoundRecipes = (state: { recipes: RecipepState }) => {
  return state.recipes.foundRecipes;
};

export default recipeSlice.reducer;