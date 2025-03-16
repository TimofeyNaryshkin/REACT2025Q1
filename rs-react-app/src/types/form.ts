export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  acceptTermsConditions: boolean | 'on';
  picture: FileList | File;
  country: string;
}

export interface ErrorMessages {
  name: string;
  age: string;
  email: string;
  password: string;
  repeatPassword: string;
  acceptTermsConditions: string;
  gender: string;
  picture: string;
  country: string;
}

export type StoredData = Omit<FormData, 'picture'> & { picture: string };

export type FormKeys = keyof FormData;
