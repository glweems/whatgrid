import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
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

export type LoginMutationVariables = {
  input: AuthInput;
};

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'UserResponse' } & {
    user: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'email'>>;
    errors: Maybe<Array<{ __typename?: 'FieldError' } & Pick<FieldError, 'path'>>>;
  };
};

export type SignUpMutationVariables = {
  input: AuthInput;
};

export type SignUpMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'UserResponse' } & {
    user: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'email'>>;
    errors: Maybe<Array<{ __typename?: 'FieldError' } & Pick<FieldError, 'path' | 'message'>>>;
  };
};

export const LoginDocument = gql`
  mutation Login($input: AuthInput!) {
    login(input: $input) {
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
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>,
  'mutation'
>;

export const LoginComponent = (props: LoginComponentProps) => (
  <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
);

export type LoginProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<LoginMutation, LoginMutationVariables>
  | TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps>>(
    LoginDocument,
    {
      alias: 'login',
      ...operationOptions,
    },
  );
}

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>,
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = gql`
  mutation SignUp($input: AuthInput!) {
    register(input: $input) {
      user {
        id
        email
      }
      errors {
        path
        message
      }
    }
  }
`;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;
export type SignUpComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<SignUpMutation, SignUpMutationVariables>,
  'mutation'
>;

export const SignUpComponent = (props: SignUpComponentProps) => (
  <ApolloReactComponents.Mutation<SignUpMutation, SignUpMutationVariables> mutation={SignUpDocument} {...props} />
);

export type SignUpProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<SignUpMutation, SignUpMutationVariables>
  | TChildProps;
export function withSignUp<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SignUpMutation,
    SignUpMutationVariables,
    SignUpProps<TChildProps>
  >,
) {
  return ApolloReactHoc.withMutation<TProps, SignUpMutation, SignUpMutationVariables, SignUpProps<TChildProps>>(
    SignUpDocument,
    {
      alias: 'signUp',
      ...operationOptions,
    },
  );
}

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>,
) {
  return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
