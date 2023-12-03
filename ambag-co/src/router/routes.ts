import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/signUp',
    component: () => import('pages/SignUp.vue'),
  },
  {
    path: '/home',
    component: () => import('pages/ProjectPage.vue'),
  },
  {
    path: '/projects',
    component: () => import('pages/ProjectPage.vue'),
  },
  {
    path: '/about',
    component: () => import('pages/AboutPage.vue'),
  },
  {
    path: '/profile',
    component: () => import('pages/ProfilePage.vue'),
  },
  {
    path: '/project/:param',
    name: 'project',
    component: () => import('pages/ProjectViewPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
