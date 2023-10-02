
import { useContext } from 'react';

import { RecipeContext } from '@/providers/RecipeProvider';


export function useRecipes() {
  return useContext(RecipeContext);
}
