export interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  acceptTermsConditions: boolean;
  picture: FileList;
  country: string;
}

export type StoredData = Omit<FormData, 'picture'> & { picture: string };

export type FormKeys = keyof FormData;
