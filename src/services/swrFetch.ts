import api from './api';

export const axiosFetcher = (url: string) => api.get(url).then((res) => res.data);
