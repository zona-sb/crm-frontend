export const routes = {
  login: () => '/login',
  signup: () => '/signup',
  priorities: () => '/priorities',
  categories: () => '/categories',
  statuses: () => '/statuses',
  workers: () => '/workers',
  home: () => '/',
};

const domain = 'https://crm-backend-production.up.railway.app';
export const apiRoutes = {
  login: () => `${domain}/api/login`,
  signup: () => `${domain}/api/registration`,
  addPriority: () => `${domain}/api/priorities`,
  modifyPriority: (id) => `${domain}/api/priorities/${id}`,
  getPriorities: () => `${domain}/api/priorities`,
  addCategory: () => `${domain}/api/categories`,
  modifyCategory: (id) => `${domain}/api/categories/${id}`,
  getCategories: () => `${domain}/api/categories`,
  addStatus: () => `${domain}/api/statuses`,
  modifyStatus: (id) => `${domain}/api/statuses/${id}`,
  getStatuses: () => `${domain}/api/statuses`,
  addWorker: () => `${domain}/api/workers`,
  modifyWorker: (id) => `${domain}/api/workers/${id}`,
  getWorkers: () => `${domain}/api/workers`,
};
