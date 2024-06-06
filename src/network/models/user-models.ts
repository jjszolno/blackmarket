export type SignUpRequest = {
  user: {
    email: string;
    name: string;
    password: string;
    passwordConfirmation: string;
  };
};

export type SignInRequest = {
  user: {
    email: string;
    password: string;
  };
};

export type SignUpResponse = {
  status: string;
  data: {
    email: string;
    provider: string;
    uid: string;
    id: number;
    allow_password_change: boolean;
    name: string;
    nickname: string;
    image: string;
    birthday: string;
  };
};
