import { lazy } from 'react';

// Каждая страница собирается в отдельный чанк и загружается по требованию.
export const RecipesPage = lazy(() => import('./RecipesPage.jsx'));
export const RecipeDetailsPage = lazy(() => import('./RecipeDetailsPage.jsx'));
export const AddRecipePage = lazy(() => import('./AddRecipePage.jsx'));
