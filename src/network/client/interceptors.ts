import humps from 'humps';
import { authStore, setUser } from 'store';

import httpClient, { CONTENT_TYPE, MULTIPART_FORM_DATA } from '.';

const AUTHORIZATION = 'authorization';

export default () => {
  httpClient.interceptors.request.use(request => {
    const { data, headers } = request;

    const { user } = authStore.getState();

    if (user) {
      const { token } = user;

      // TODO: attach extra params to request
      headers[AUTHORIZATION] = `${token}`;
    }

    if (headers && headers[CONTENT_TYPE] !== MULTIPART_FORM_DATA) {
      request.data = humps.decamelizeKeys(data);
    }
    return request;
  });

  httpClient.interceptors.response.use(
    async response => {
      const { data, headers } = response;
      const token = headers[AUTHORIZATION];
      const { user } = authStore.getState();
      const userId = data?.data?.id || user?.id;

      if (token) {
        // TODO: save extra params to storage
        const userData = {
          token,
          id: userId,
        };

        setUser(userData);
      }

      response.data = humps.camelizeKeys(data);
      return response;
    },
    error => {
      if (error.response) {
        if (error.response.status === 401) {
          authStore.getState().clearUser();
        }
      }

      // TODO: include additional interceptors here (IE: logout)
      return Promise.reject(error);
    },
  );
};
