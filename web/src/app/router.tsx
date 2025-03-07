import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from './routes/app/root';

import { paths } from '@/config/paths';
import { ProtectedRoute } from '@/lib/auth';

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => import('./routes/landing').then(convert(queryClient)),
    },
    {
      path: paths.auth.register.path,
      lazy: () => import('./routes/auth/register').then(convert(queryClient)),
    },
    {
      path: paths.auth.login.path,
      lazy: () => import('./routes/auth/login').then(convert(queryClient)),
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          path: paths.app.discussions.path,
          lazy: () =>
            import('./routes/app/discussions/discussions').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.discussion.path,
          lazy: () =>
            import('./routes/app/discussions/discussion').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.mealplans.path,
          lazy: () =>
            import('./routes/app/mealplans/mealplans').then(
              convert(queryClient),
            ),
        },
        {
          path: paths.app.recipes.path,
          lazy: () =>
            import('./routes/app/recipes/recipes').then(convert(queryClient)),
        },
        {
          path: paths.app.health.path,
          lazy: () =>
            import('./routes/app/health/health').then(convert(queryClient)),
        },
        {
          path: paths.app.shopping.path,
          lazy: () =>
            import('./routes/app/shopping/shopping').then(convert(queryClient)),
        },
        {
          path: paths.app.tasks.path,
          lazy: () =>
            import('./routes/app/tasks/tasks').then(convert(queryClient)),
        },
        {
          path: paths.app.calendar.path,
          lazy: () =>
            import('./routes/app/calendar/calendar').then(convert(queryClient)),
        },
        {
          path: paths.app.members.path,
          lazy: () =>
            import('./routes/app/members/members').then(convert(queryClient)),
        },
        {
          path: paths.app.users.path,
          lazy: () => import('./routes/app/users').then(convert(queryClient)),
        },
        {
          path: paths.app.profile.path,
          lazy: () => import('./routes/app/profile').then(convert(queryClient)),
        },
        {
          path: paths.app.dashboard.path,
          lazy: () =>
            import('./routes/app/dashboard').then(convert(queryClient)),
        },
      ],
    },
    {
      path: '*',
      lazy: () => import('./routes/not-found').then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
