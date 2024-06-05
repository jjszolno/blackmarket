import client from '../client';
import { SignUpRequest, SignUpResponse } from '../models/user-models';

const UserService = {
  post: async (request: SignUpRequest) => {
    const { data } = await client.post<SignUpResponse>('/users', request);
    return data;
  },
};

export default UserService;
