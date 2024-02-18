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
    items?: keyValuePair[]
  };