import instance from './axios';

export const getProfile = () => instance.get('profile/').then((r) => r.data);

export const updateProfile = (payload) => instance.patch('profile/', payload).then((r) => r.data);
