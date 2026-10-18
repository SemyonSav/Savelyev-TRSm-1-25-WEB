import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { recipeService } from '@/api/RecipeService.js';
import RecipeForm from '@/components/forms/RecipeForm.jsx';
import { APP_NAME } from '@/config/constants.js';
import { useRecipeForm } from '@/hooks/useRecipeForm.js';
import { toRecipePayload } from '@/utils/recipeForm.js';

export default function AddRecipePage() {
  const { values, errors, setField, validate, reset } = useRecipeForm();
  const formRef = useRef(null);
  const [focusRequest, setFocusRequest] = useState(0);
  const [status, setStatus] = useState({ state: 'idle', recipe: null, error: null });

  // После отрисовки ошибок переводим фокус на первое некорректное поле
  useEffect(() => {
    if (focusRequest > 0) {
      formRef.current?.querySelector('.is-invalid')?.focus();
    }
  }, [focusRequest]);

  const handleSubmit = async () => {
    if (!validate()) {
      setFocusRequest((value) => value + 1);
      return;
    }

    setStatus({ state: 'submitting', recipe: null, error: null });

    try {
      const recipe = await recipeService.create(toRecipePayload(values));
      setStatus({ state: 'success', recipe, error: null });
      reset();
    } catch (error) {
      setStatus({ state: 'error', recipe: null, error });
    }
  };

  return (
    <>
      <title>{`Новый рецепт — ${APP_NAME}`}</title>
      <h1 className="h3 mb-1">Новый рецепт</h1>
      <p className="text-body-secondary mb-4">
        Поля, отмеченные <span className="text-danger">*</span>, обязательны для заполнения.
      </p>

      {status.state === 'success' && (
        <Alert variant="success">
          Рецепт «{status.recipe.name}» создан, id {status.recipe.id}.
        </Alert>
      )}
      {status.state === 'error' && (
        <Alert variant="danger">Не удалось сохранить рецепт: {status.error.message}</Alert>
      )}

      <RecipeForm
        ref={formRef}
        values={values}
        errors={errors}
        onFieldChange={setField}
        onSubmit={handleSubmit}
        onReset={reset}
        isSubmitting={status.state === 'submitting'}
      />
    </>
  );
}
