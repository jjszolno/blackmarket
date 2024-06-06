import { useMutation } from '@tanstack/react-query';

import type { AxiosResult } from 'network/models/axios';
import { SignUpResponse } from 'network/models/user-models';
import UserService from 'network/services/user-services';

const useSignUp = ({ onError, onSuccess }: AxiosResult<SignUpResponse>) =>
  useMutation(UserService.post, {
    onError,
    onSuccess,
  });

const useSignIn = ({ onError, onSuccess }: AxiosResult<SignUpResponse>) =>
  useMutation(UserService.login, {
    onError,
    onSuccess,
  });

export { useSignUp, useSignIn };
