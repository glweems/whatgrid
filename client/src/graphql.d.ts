export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};

export type MutationRegisterArgs = {
  input: AuthInput;
};

export type MutationLoginArgs = {
  input: AuthInput;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  book: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  email: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
};

export type RegisterUserMutationVariables = {
  input: AuthInput;
};

export type RegisterUserMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'UserResponse' } & {
    user: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'email'>>;
    errors: Maybe<Array<{ __typename?: 'FieldError' } & Pick<FieldError, 'path'>>>;
  };
};

declare module '*/RegisterUser.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const RegisterUser: DocumentNode;

  export default defaultDocument;
}
