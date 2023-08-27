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
  priorities: () => `${domain}/api/priorities`,
  categories: () => `${domain}/api/categories`,
  statuses: () => `${domain}/api/statuses`,
  workers: () => `${domain}/api/workers`,
  clients: () => `${domain}/api/clients`,
  modifyPriority: (id) => `${domain}/api/priorities/${id}`,
  modifyCategory: (id) => `${domain}/api/categories/${id}`,
  modifyStatus: (id) => `${domain}/api/statuses/${id}`,
  modifyWorker: (id) => `${domain}/api/workers/${id}`,
  modifyClient: (id) => `${domain}/api/clients/${id}`,
};
