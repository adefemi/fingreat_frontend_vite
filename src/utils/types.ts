export interface UserType {
  id: string;
  created_at: string;
  updated_at: string;
  email: string;
  username: string;
}

export type SignInResponseType = {
  token: string;
};

export type keyValuePair = {
  [key: string]: any;
};

export type SelectItemsType = keyValuePair & {
  helpText?: string;
  items?: keyValuePair[];
};

export interface AccountType {
  id: string;
  balance: number;
  amount?: string;
  created_at: string;
  currency: string;
  account_number: string;
}

export interface VerifyAccountType extends AccountType {
  email: string;
}
