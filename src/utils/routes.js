export const routes = {
  login: () => '/login',
  signup: () => '/signup',
  home: () => '/',
};

const domain = 'https://crm-backend-production.up.railway.app';
export const apiRoutes = {
  login: () => `${domain}/api/login`,
  signup: () => `${domain}/api/registration`,
};
