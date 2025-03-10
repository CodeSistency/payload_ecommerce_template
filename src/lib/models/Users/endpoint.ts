// const BASE_URL = `${process.env.BASE_URL}/`;
const BASE_URL = `http://localhost:3000`;
// const BASE_URL = `https://class-room-nest.onrender.com`;

export const endpoint = {
  register: {
    url: `${BASE_URL}/users`,
  },
  excel: {
    url: (model: string) => `${BASE_URL}/cloud/${model}`,
  },
  get: {
    url: `${BASE_URL}/users/findMany`,
  },
  delete: {
    url: (id: string) => `${BASE_URL}/users/${id}`,
  },
  changeRole: {
    url: `${BASE_URL}/users/changeRole`,
  },
  update: {
    url: `${BASE_URL}/users`,
  },
  login: {
    url: `${BASE_URL}/auth/login`,
  },
};

export type EndpointType = typeof endpoint;
