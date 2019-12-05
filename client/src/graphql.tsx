import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';

export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export const RegisterUserDocument = gql`
  mutation RegisterUser($input: AuthInput!) {
    register(input: $input) {
      user {
        id
        email
      }
      errors {
        path
      }
    }
  }
`;
export type RegisterUserMutationFn = ApolloReactCommon.MutationFunction<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;
export type RegisterUserComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<RegisterUserMutation, RegisterUserMutationVariables>,
  'mutation'
>;

export const RegisterUserComponent = (props: RegisterUserComponentProps) => (
  <ApolloReactComponents.Mutation<RegisterUserMutation, RegisterUserMutationVariables>
    mutation={RegisterUserDocument}
    {...props}
  />
);

export type RegisterUserProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<RegisterUserMutation, RegisterUserMutationVariables>
  | TChildProps;
export function withRegisterUser<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    RegisterUserMutation,
    RegisterUserMutationVariables,
    RegisterUserProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<
    TProps,
    RegisterUserMutation,
    RegisterUserMutationVariables,
    RegisterUserProps<TChildProps>
  >(RegisterUserDocument, {
    alias: 'registerUser',
    ...operationOptions,
  });
}
export type RegisterUserMutationResult = ApolloReactCommon.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterUserMutation,
  RegisterUserMutationVariables
>;
