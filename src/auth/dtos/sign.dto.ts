export class InputSignInDto {
  email: string;
  password: string;
}

export class OutputSignInDto {
  token: string;
  user: {
    id: number;
    email: string;
    type: string;
    name: string;
  };
}
