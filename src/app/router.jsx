import { createBrowserRouter } from 'react-router';
import Layout from '@/components/layout/Layout.jsx';
import PageSuspense from '@/components/layout/PageSuspense.jsx';
import RouteErrorPage from '@/pages/RouteErrorPage.jsx';
import { AddRecipePage, NotFoundPage, RecipeDetailsPage, RecipesPage } from '@/pages/index.js';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: (
          <PageSuspense>
            <RecipesPage />
          </PageSuspense>
        ),
      },
      {
        path: 'recipes/new',
        element: (
          <PageSuspense>
            <AddRecipePage />
          </PageSuspense>
        ),
      },
      {
        path: 'recipes/:id',
        element: (
          <PageSuspense>
            <RecipeDetailsPage />
          </PageSuspense>
        ),
      },
      {
        path: '*',
        element: (
          <PageSuspense>
            <NotFoundPage />
          </PageSuspense>
        ),
      },
    ],
  },
]);
