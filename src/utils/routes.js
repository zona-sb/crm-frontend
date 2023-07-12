export const routes = {
  signup: () => '/signup',
  home: () => '/',
};

const https = 'https://crm-backend-production.up.railway.app';
export const apiRoutes = {
  signup: () => `${https}/api/registration`,
};
