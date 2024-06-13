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

      if (token) {
        // TODO: save extra params to storage
        const user = {
          token,
        };

        setUser(user);
      }

      response.data = humps.camelizeKeys(data);
      return response;
    },
    error =>
      // TODO: include additional interceptors here (IE: logout)
      Promise.reject(error),
  );
};
