export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    dashboard: {
      path: '',
      getHref: () => '/app',
    },
    mealplans: {
      path: 'mealplans',
      getHref: () => '/app/mealplans',
    },
    recipes: {
      path: 'recipes',
      getHref: () => '/app/recipes',
    },
    health: {
      path: 'health',
      getHref: () => '/app/health',
    },
    shopping: {
      path: 'shopping',
      getHref: () => '/app/shopping',
    },
    tasks: {
      path: 'tasks',
      getHref: () => '/app/tasks',
    },
    calendar: {
      path: 'calendar',
      getHref: () => '/app/calendar',
    },
    members: {
      path: 'members',
      getHref: () => '/app/members',
    },
    discussions: {
      path: 'discussions',
      getHref: () => '/app/discussions',
    },
    discussion: {
      path: 'discussions/:discussionId',
      getHref: (id: string) => `/app/discussions/${id}`,
    },
    users: {
      path: 'users',
      getHref: () => '/app/users',
    },
    profile: {
      path: 'profile',
      getHref: () => '/app/profile',
    },
  },
} as const;
