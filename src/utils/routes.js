export const routes = {
  main: () => '/',
  login: () => '/login',
  signup: () => '/signup',
  clients: () => 'clients',
  workers: () => 'workers',
  categories: () => 'categories',
  statuses: () => 'statuses',
  priorities: () => 'priorities',
  tasks: () => 'tasks',
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
  deletePriorities: () => `${domain}/api/priorities`,
  deleteCategories: () => `${domain}/api/categories`,
  deleteStatuses: () => `${domain}/api/statuses`,
};
