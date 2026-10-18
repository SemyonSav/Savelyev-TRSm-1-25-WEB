import { useCallback, useState } from 'react';
import { EMPTY_RECIPE_FORM } from '@/utils/recipeForm.js';
import { validateRecipe } from '@/utils/recipeValidation.js';

/**
 * Состояние и валидация формы рецепта. Ошибки показываются после первой
 * попытки отправки и дальше обновляются при каждом изменении.
 */
export function useRecipeForm(initialValues = EMPTY_RECIPE_FORM) {
  const [values, setValues] = useState(initialValues);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = isSubmitted ? validateRecipe(values) : {};

  const setField = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  /** @returns {boolean} true, если форма заполнена корректно */
  const validate = useCallback(() => {
    setIsSubmitted(true);
    return Object.keys(validateRecipe(values)).length === 0;
  }, [values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setIsSubmitted(false);
  }, [initialValues]);

  return { values, errors, setField, validate, reset };
}
