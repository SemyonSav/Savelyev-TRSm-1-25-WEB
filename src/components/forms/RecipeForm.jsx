import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';
import { DIFFICULTIES, MEAL_TYPES } from '@/config/constants.js';
import FormField from './FormField.jsx';
import ListField from './ListField.jsx';

/**
 * Форма рецепта. Повторяет поля сущности API, кроме id (его назначает сервер).
 * @param {{
 *   values: import('@/utils/recipeForm.js').RecipeFormValues,
 *   errors?: Partial<Record<keyof import('@/utils/recipeForm.js').RecipeFormValues, string>>,
 *   onFieldChange: (name: string, value: unknown) => void,
 *   onSubmit: () => void,
 *   onReset: () => void,
 *   isSubmitting?: boolean,
 * }} props
 */
export default function RecipeForm({
  values,
  errors = {},
  onFieldChange,
  onSubmit,
  onReset,
  isSubmitting = false,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit();
  };

  const toggleMealType = (type) => {
    const next = values.mealType.includes(type)
      ? values.mealType.filter((item) => item !== type)
      : [...values.mealType, type];
    onFieldChange('mealType', next);
  };

  return (
    <Form noValidate onSubmit={handleSubmit} className="recipe-form">
      <fieldset disabled={isSubmitting} className="d-grid gap-4">
        <Card body>
          <h2 className="h6 mb-3">Основное</h2>
          <Row className="g-3">
            <Col md={8}>
              <FormField
                name="name"
                label="Название"
                value={values.name}
                onChange={onFieldChange}
                error={errors.name}
                placeholder="Например, Classic Margherita Pizza"
                maxLength={100}
                required
              />
            </Col>
            <Col md={4}>
              <Form.Group controlId="field-difficulty">
                <Form.Label>Сложность</Form.Label>
                <Form.Select
                  value={values.difficulty}
                  onChange={(event) => onFieldChange('difficulty', event.target.value)}
                >
                  {DIFFICULTIES.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <FormField
                name="cuisine"
                label="Кухня"
                value={values.cuisine}
                onChange={onFieldChange}
                error={errors.cuisine}
                placeholder="Italian"
                maxLength={50}
                required
              />
            </Col>
            <Col md={8}>
              <FormField
                name="image"
                label="Ссылка на изображение"
                type="url"
                value={values.image}
                onChange={onFieldChange}
                error={errors.image}
                placeholder="https://…"
              />
            </Col>
          </Row>
        </Card>

        <Card body>
          <h2 className="h6 mb-3">Время и порции</h2>
          <Row xs={1} sm={2} lg={4} className="g-3">
            <Col>
              <FormField
                name="prepTimeMinutes"
                label="Подготовка, мин"
                type="number"
                inputMode="numeric"
                min={0}
                value={values.prepTimeMinutes}
                onChange={onFieldChange}
                error={errors.prepTimeMinutes}
                required
              />
            </Col>
            <Col>
              <FormField
                name="cookTimeMinutes"
                label="Приготовление, мин"
                type="number"
                inputMode="numeric"
                min={0}
                value={values.cookTimeMinutes}
                onChange={onFieldChange}
                error={errors.cookTimeMinutes}
                required
              />
            </Col>
            <Col>
              <FormField
                name="servings"
                label="Порций"
                type="number"
                inputMode="numeric"
                min={1}
                value={values.servings}
                onChange={onFieldChange}
                error={errors.servings}
                required
              />
            </Col>
            <Col>
              <FormField
                name="caloriesPerServing"
                label="Ккал на порцию"
                type="number"
                inputMode="numeric"
                min={0}
                value={values.caloriesPerServing}
                onChange={onFieldChange}
                error={errors.caloriesPerServing}
                required
              />
            </Col>
          </Row>
        </Card>

        <Card body>
          <fieldset>
            <legend className="h6 mb-3">Тип блюда</legend>
            <div className="d-flex flex-wrap gap-3">
              {MEAL_TYPES.map((type) => (
                <Form.Check
                  key={type.value}
                  id={`meal-${type.value}`}
                  type="checkbox"
                  label={type.label}
                  checked={values.mealType.includes(type.value)}
                  onChange={() => toggleMealType(type.value)}
                  isInvalid={Boolean(errors.mealType)}
                />
              ))}
            </div>
            {errors.mealType && <div className="invalid-feedback d-block">{errors.mealType}</div>}
          </fieldset>
        </Card>

        <Card body>
          <Row className="g-4">
            <Col lg={5}>
              <ListField
                id="ingredients"
                label="Ингредиенты"
                items={values.ingredients}
                onChange={(items) => onFieldChange('ingredients', items)}
                placeholder="Например, 200 g pasta"
                addLabel="Ингредиент"
                error={errors.ingredients}
              />
            </Col>
            <Col lg={7}>
              <ListField
                id="instructions"
                label="Шаги приготовления"
                items={values.instructions}
                onChange={(items) => onFieldChange('instructions', items)}
                placeholder="Опишите шаг"
                addLabel="Шаг"
                multiline
                error={errors.instructions}
              />
            </Col>
          </Row>
        </Card>

        <Card body>
          <h2 className="h6 mb-3">Дополнительно</h2>
          <Row className="g-3">
            <Col md={6}>
              <FormField
                name="tags"
                label="Теги"
                value={values.tags}
                onChange={onFieldChange}
                error={errors.tags}
                placeholder="Pasta, Italian, Quick"
                hint="Через запятую"
              />
            </Col>
            <Col xs={6} md={2}>
              <FormField
                name="rating"
                label="Рейтинг"
                type="number"
                inputMode="decimal"
                min={0}
                max={5}
                step={0.1}
                value={values.rating}
                onChange={onFieldChange}
                error={errors.rating}
                hint="0–5"
              />
            </Col>
            <Col xs={6} md={2}>
              <FormField
                name="reviewCount"
                label="Отзывов"
                type="number"
                inputMode="numeric"
                min={0}
                value={values.reviewCount}
                onChange={onFieldChange}
                error={errors.reviewCount}
              />
            </Col>
            <Col md={2}>
              <FormField
                name="userId"
                label="ID автора"
                type="number"
                inputMode="numeric"
                min={1}
                value={values.userId}
                onChange={onFieldChange}
                error={errors.userId}
                required
              />
            </Col>
          </Row>
        </Card>

        <div className="d-flex flex-column flex-sm-row gap-2">
          <Button type="submit" variant="primary">
            {isSubmitting && (
              <Spinner animation="border" size="sm" className="me-2" aria-hidden="true" />
            )}
            {isSubmitting ? 'Сохраняем…' : 'Сохранить рецепт'}
          </Button>
          <Button type="button" variant="outline-secondary" onClick={onReset}>
            Очистить форму
          </Button>
        </div>
      </fieldset>
    </Form>
  );
}
