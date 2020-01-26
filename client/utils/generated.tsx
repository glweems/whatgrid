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
  DateTime: any;
  Id: any;
};

export type AuthPayload = {
  token: Scalars['String'];
  user: User;
};

export type Grid = {
  id: Scalars['ID'];
  name: Scalars['String'];
  entries: Array<Maybe<GridEntry>>;
  author: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type GridEntry = {
  id: Scalars['String'];
  type: GridEntryType;
  amount: Scalars['String'];
  unit: Scalars['String'];
};

export enum GridEntryType {
  Column = 'Column',
  Row = 'Row'
}

export type Mutation = {
  signup: AuthPayload;
  login: AuthPayload;
  logout?: Maybe<SuccessMessage>;
};

export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  grids: Array<Grid>;
  grid?: Maybe<Grid>;
  user?: Maybe<User>;
  users: Array<User>;
  me?: Maybe<User>;
};

export type QueryGridArgs = {
  id: Scalars['ID'];
};

export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
};

export type QueryUsersArgs = {
  searchString?: Maybe<Scalars['String']>;
};

export type SuccessMessage = {
  message?: Maybe<Scalars['String']>;
};

export type User = {
  id: Scalars['ID'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  password?: Maybe<Scalars['String']>;
  grids?: Maybe<Array<Maybe<Grid>>>;
};

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutation = {
  login: Pick<AuthPayload, 'token'> & { user: UserFieldsFragment };
};

export type LogoutMutationVariables = {};

export type LogoutMutation = { logout: Maybe<Pick<SuccessMessage, 'message'>> };

export type SignupMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type SignupMutation = {
  signup: Pick<AuthPayload, 'token'> & { user: UserFieldsFragment };
};

export type DashboardQueryVariables = {
  id: Scalars['ID'];
};

export type DashboardQuery = {
  profile: Maybe<
    Pick<
      User,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'email'
      | 'firstName'
      | 'lastName'
      | 'username'
      | 'phoneNumber'
    > & { grids: Maybe<Array<Maybe<Pick<Grid, 'id'>>>> }
  >;
};

export type UserFieldsFragment = Pick<
  User,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'username'
  | 'phoneNumber'
> & { grids: Maybe<Array<Maybe<Pick<Grid, 'id'>>>> };

export type MeQueryVariables = {};

export type MeQuery = { me: Maybe<Pick<User, 'id' | 'email' | 'username'>> };

export type UserQueryVariables = {
  id?: Maybe<Scalars['ID']>;
};

export type UserQuery = {
  user: Maybe<
    Pick<
      User,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'email'
      | 'firstName'
      | 'lastName'
      | 'username'
      | 'phoneNumber'
    > & { grids: Maybe<Array<Maybe<Pick<Grid, 'id'>>>> }
  >;
};

export type UsersQueryVariables = {};

export type UsersQuery = { users: Array<Pick<User, 'id' | 'email'>> };

export const UserFieldsFragmentDoc = gql`
  fragment userFields on User {
    id
    createdAt
    updatedAt
    email
    firstName
    lastName
    username
    phoneNumber
    grids {
      id
    }
  }
`;
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        ...userFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;
export type LoginComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    LoginMutation,
    LoginMutationVariables
  >,
  'mutation'
>;

export const LoginComponent = (props: LoginComponentProps) => (
  <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
);

export type LoginProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  LoginMutation,
  LoginMutationVariables
> &
  TChildProps;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, {
    alias: 'login',
    ...operationOptions
  });
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
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;
export type LogoutComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
  'mutation'
>;

export const LogoutComponent = (props: LogoutComponentProps) => (
  <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables>
    mutation={LogoutDocument}
    {...props}
  />
);

export type LogoutProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  LogoutMutation,
  LogoutMutationVariables
> &
  TChildProps;
export function withLogout<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    LogoutMutation,
    LogoutMutationVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, {
    alias: 'logout',
    ...operationOptions
  });
}

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<
  LogoutMutation
>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const SignupDocument = gql`
  mutation Signup($email: String!, $password: String!, $username: String) {
    signup(email: $email, password: $password, username: $username) {
      token
      user {
        ...userFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type SignupMutationFn = ApolloReactCommon.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>;
export type SignupComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    SignupMutation,
    SignupMutationVariables
  >,
  'mutation'
>;

export const SignupComponent = (props: SignupComponentProps) => (
  <ApolloReactComponents.Mutation<SignupMutation, SignupMutationVariables>
    mutation={SignupDocument}
    {...props}
  />
);

export type SignupProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  SignupMutation,
  SignupMutationVariables
> &
  TChildProps;
export function withSignup<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SignupMutation,
    SignupMutationVariables,
    SignupProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    SignupMutation,
    SignupMutationVariables,
    SignupProps<TChildProps>
  >(SignupDocument, {
    alias: 'signup',
    ...operationOptions
  });
}

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    baseOptions
  );
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = ApolloReactCommon.MutationResult<
  SignupMutation
>;
export type SignupMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
export const DashboardDocument = gql`
  query Dashboard($id: ID!) {
    profile: user(id: $id) {
      id
      createdAt
      updatedAt
      email
      firstName
      lastName
      username
      phoneNumber
      grids {
        id
      }
    }
  }
`;
export type DashboardComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    DashboardQuery,
    DashboardQueryVariables
  >,
  'query'
> &
  ({ variables: DashboardQueryVariables; skip?: boolean } | { skip: boolean });

export const DashboardComponent = (props: DashboardComponentProps) => (
  <ApolloReactComponents.Query<DashboardQuery, DashboardQueryVariables>
    query={DashboardDocument}
    {...props}
  />
);

export type DashboardProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  DashboardQuery,
  DashboardQueryVariables
> &
  TChildProps;
export function withDashboard<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DashboardQuery,
    DashboardQueryVariables,
    DashboardProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    DashboardQuery,
    DashboardQueryVariables,
    DashboardProps<TChildProps>
  >(DashboardDocument, {
    alias: 'dashboard',
    ...operationOptions
  });
}

/**
 * __useDashboardQuery__
 *
 * To run a query within a React component, call `useDashboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDashboardQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    DashboardQuery,
    DashboardQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<DashboardQuery, DashboardQueryVariables>(
    DashboardDocument,
    baseOptions
  );
}
export function useDashboardLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    DashboardQuery,
    DashboardQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<DashboardQuery, DashboardQueryVariables>(
    DashboardDocument,
    baseOptions
  );
}
export type DashboardQueryHookResult = ReturnType<typeof useDashboardQuery>;
export type DashboardLazyQueryHookResult = ReturnType<
  typeof useDashboardLazyQuery
>;
export type DashboardQueryResult = ApolloReactCommon.QueryResult<
  DashboardQuery,
  DashboardQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      email
      username
    }
  }
`;
export type MeComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>,
  'query'
>;

export const MeComponent = (props: MeComponentProps) => (
  <ApolloReactComponents.Query<MeQuery, MeQueryVariables>
    query={MeDocument}
    {...props}
  />
);

export type MeProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  MeQuery,
  MeQueryVariables
> &
  TChildProps;
export function withMe<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >(MeDocument, {
    alias: 'me',
    ...operationOptions
  });
}

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>;
export const UserDocument = gql`
  query User($id: ID) {
    user(id: $id) {
      id
      createdAt
      updatedAt
      email
      firstName
      lastName
      username
      phoneNumber
      grids {
        id
      }
    }
  }
`;
export type UserComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<UserQuery, UserQueryVariables>,
  'query'
>;

export const UserComponent = (props: UserComponentProps) => (
  <ApolloReactComponents.Query<UserQuery, UserQueryVariables>
    query={UserDocument}
    {...props}
  />
);

export type UserProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  UserQuery,
  UserQueryVariables
> &
  TChildProps;
export function withUser<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UserQuery,
    UserQueryVariables,
    UserProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    UserQuery,
    UserQueryVariables,
    UserProps<TChildProps>
  >(UserDocument, {
    alias: 'user',
    ...operationOptions
  });
}

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  );
}
export function useUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserQuery,
    UserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    baseOptions
  );
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<
  UserQuery,
  UserQueryVariables
>;
export const UsersDocument = gql`
  query Users {
    users {
      id
      email
    }
  }
`;
export type UsersComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<UsersQuery, UsersQueryVariables>,
  'query'
>;

export const UsersComponent = (props: UsersComponentProps) => (
  <ApolloReactComponents.Query<UsersQuery, UsersQueryVariables>
    query={UsersDocument}
    {...props}
  />
);

export type UsersProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  UsersQuery,
  UsersQueryVariables
> &
  TChildProps;
export function withUsers<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UsersQuery,
    UsersQueryVariables,
    UsersProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    UsersQuery,
    UsersQueryVariables,
    UsersProps<TChildProps>
  >(UsersDocument, {
    alias: 'users',
    ...operationOptions
  });
}

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UsersQuery,
    UsersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export function useUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UsersQuery,
    UsersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    baseOptions
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
