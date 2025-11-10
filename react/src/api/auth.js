import instance from './axios';

export const registerUser = (payload) => {
  // payload: { email, first_name, last_name, password }
  return instance.post('auth/register/', payload).then((r) => r.data);
};

export const loginUser = (payload) => {
  // payload: { email, password }
  return instance.post('auth/login/', payload).then((r) => r.data);
};
