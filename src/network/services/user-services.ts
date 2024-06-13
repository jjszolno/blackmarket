import client from '../client';
import { SignInRequest, SignUpRequest, SignUpResponse } from '../models/user-models';

const UserService = {
  post: async (request: SignUpRequest) => {
    const { data } = await client.post<SignUpResponse>('/users', request);
    return data;
  },
  login: async (request: SignInRequest) => {
    const { data } = await client.post<SignUpResponse>('/users/sign_in', request);
    return data;
  },
};

export default UserService;
