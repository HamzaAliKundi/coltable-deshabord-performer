export interface ILoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
}