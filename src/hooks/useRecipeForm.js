import { useCallback, useState } from 'react';
import { EMPTY_RECIPE_FORM } from '@/utils/recipeForm.js';

/** Состояние формы рецепта. */
export function useRecipeForm(initialValues = EMPTY_RECIPE_FORM) {
  const [values, setValues] = useState(initialValues);

  const setField = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const reset = useCallback(() => setValues(initialValues), [initialValues]);

  return { values, setField, reset };
}
