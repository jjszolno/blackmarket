import { setUser } from 'store';

import client from '../client';
import { SignInRequest, SignUpRequest, SignUpResponse } from '../models/user-models';

const UserService = {
  post: async (request: SignUpRequest) => {
    const { data, headers } = await client.post<SignUpResponse>('/users', request);
    setUser({ token: headers['access-token'] });
    return data;
  },
  login: async (request: SignInRequest) => {
    const { data, headers } = await client.post<SignUpResponse>('/users/sign_in', request);
    setUser({ token: headers['access-token'] });
    return data;
  },
};

export default UserService;
