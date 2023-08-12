export const routes = {
  login: () => '/login',
  signup: () => '/signup',
  priorities: () => '/priorities',
  categories: () => '/categories',
  statuses: () => '/statuses',
  workers: () => '/workers',
  clients: () => '/clients',
  home: () => '/',
};

const domain = 'https://zona-crm-dev.onrender.com';
export const apiRoutes = {
  login: () => `${domain}/api/login`,
  signup: () => `${domain}/api/registration`,
  addPriority: () => `${domain}/api/priorities`,
  addCategory: () => `${domain}/api/categories`,
  addStatus: () => `${domain}/api/statuses`,
  addWorker: () => `${domain}/api/workers`,
  addClient: () => `${domain}/api/clients`,
  modifyPriority: (id) => `${domain}/api/priorities/${id}`,
  modifyCategory: (id) => `${domain}/api/categories/${id}`,
  modifyStatus: (id) => `${domain}/api/statuses/${id}`,
  modifyWorker: (id) => `${domain}/api/workers/${id}`,
  modifyClient: (id) => `${domain}/api/clients/${id}`,
  getPriorities: () => `${domain}/api/priorities`,
  getCategories: () => `${domain}/api/categories`,
  getStatuses: () => `${domain}/api/statuses`,
  getWorkers: () => `${domain}/api/workers`,
  getClients: () => `${domain}/api/clients`,
  deleteBulkPriorities: () => `${domain}/api/priorities/bulk`,
  deleteBulkCategories: () => `${domain}/api/categories/bulk`,
  deleteBulkStatuses: () => `${domain}/api/statuses/bulk`,
};
