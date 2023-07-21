export const routes = {
  login: () => '/login',
  signup: () => '/signup',
  home: () => '/',
};

const domain = 'https://crm-backend-production.up.railway.app';
export const apiRoutes = {
  login: () => `${domain}/api/login`,
  signup: () => `${domain}/api/registration`,
  addPriority: () => `${domain}/api/priorities`,
  modifyPriority: (id) => `${domain}/api/priorities/${id}`,
  getPriorities: () => `${domain}/api/priorities`,
};
