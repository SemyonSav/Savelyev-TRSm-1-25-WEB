import { APP_NAME } from '@/config/constants.js';

export default function AddRecipePage() {
  return (
    <>
      <title>{`Новый рецепт — ${APP_NAME}`}</title>
      <h1 className="h3 mb-4">Новый рецепт</h1>
    </>
  );
}
