import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as React from 'react'
import * as ApolloReactComponents from '@apollo/react-components'
import * as ApolloReactHoc from '@apollo/react-hoc'
import * as ApolloReactHooks from '@apollo/react-hooks'

export type Maybe<T> = T | null
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
  Id: any
}

export type AuthPayload = {
  token: Scalars['String']
  user: User
}

export type Grid = {
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  published: Scalars['Boolean']
  name?: Maybe<Scalars['String']>
  rows?: Maybe<Scalars['Int']>
  columns?: Maybe<Scalars['Int']>
  gridTemplateColumns?: Maybe<Scalars['String']>
  gridTemplateRows?: Maybe<Scalars['String']>
  author: User
}

export type Mutation = {
  signup: AuthPayload
  login: AuthPayload
}

export type MutationSignupArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationLoginArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type Query = {
  grids: Array<Grid>
  grid?: Maybe<Grid>
  user?: Maybe<User>
  users: Array<User>
  me?: Maybe<User>
}

export type QueryGridArgs = {
  id: Scalars['ID']
}

export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>
  email?: Maybe<Scalars['String']>
}

export type QueryUsersArgs = {
  searchString?: Maybe<Scalars['String']>
}

export type User = {
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  email: Scalars['String']
  name?: Maybe<Scalars['String']>
  password?: Maybe<Scalars['String']>
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
  phoneNumber?: Maybe<Scalars['Int']>
  grids: Array<Grid>
}

export type LoginMutationVariables = {
  email: Scalars['String']
  password: Scalars['String']
}

export type LoginMutation = {
  login: Pick<AuthPayload, 'token'> & { user: Pick<User, 'id' | 'email'> }
}

export type SignUpMutationVariables = {
  email: Scalars['String']
  password: Scalars['String']
}

export type SignUpMutation = {
  signup: Pick<AuthPayload, 'token'> & { user: Pick<User, 'id' | 'email'> }
}

export type UserFieldsFragment = Pick<
  User,
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'email'
  | 'name'
  | 'firstName'
  | 'lastName'
  | 'username'
  | 'phoneNumber'
> & {
  grids: Array<
    Pick<
      Grid,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'published'
      | 'name'
      | 'rows'
      | 'columns'
      | 'gridTemplateColumns'
      | 'gridTemplateRows'
    >
  >
}

export type MeQueryVariables = {}

export type MeQuery = { me: Maybe<UserFieldsFragment> }

export type UserQueryVariables = {
  id: Scalars['ID']
}

export type UserQuery = {
  user: Maybe<
    Pick<
      User,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'email'
      | 'name'
      | 'firstName'
      | 'lastName'
      | 'username'
      | 'phoneNumber'
    > & {
      grids: Array<
        Pick<
          Grid,
          | 'id'
          | 'createdAt'
          | 'updatedAt'
          | 'published'
          | 'name'
          | 'rows'
          | 'columns'
          | 'gridTemplateColumns'
          | 'gridTemplateRows'
        >
      >
    }
  >
}

export type UsersQueryVariables = {}

export type UsersQuery = { users: Array<Pick<User, 'id' | 'email'>> }

export const UserFieldsFragmentDoc = gql`
  fragment userFields on User {
    id
    createdAt
    updatedAt
    email
    name
    firstName
    lastName
    username
    phoneNumber
    grids {
      id
      createdAt
      updatedAt
      published
      name
      rows
      columns
      gridTemplateColumns
      gridTemplateRows
    }
  }
`
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>
export type LoginComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    LoginMutation,
    LoginMutationVariables
  >,
  'mutation'
>

export const LoginComponent = (props: LoginComponentProps) => (
  <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
)

export type LoginProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<LoginMutation, LoginMutationVariables>
  | TChildProps
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
  })
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
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const SignUpDocument = gql`
  mutation SignUp($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>
export type SignUpComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    SignUpMutation,
    SignUpMutationVariables
  >,
  'mutation'
>

export const SignUpComponent = (props: SignUpComponentProps) => (
  <ApolloReactComponents.Mutation<SignUpMutation, SignUpMutationVariables>
    mutation={SignUpDocument}
    {...props}
  />
)

export type SignUpProps<TChildProps = {}> =
  | ApolloReactHoc.MutateProps<SignUpMutation, SignUpMutationVariables>
  | TChildProps
export function withSignUp<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SignUpMutation,
    SignUpMutationVariables,
    SignUpProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    SignUpMutation,
    SignUpMutationVariables,
    SignUpProps<TChildProps>
  >(SignUpDocument, {
    alias: 'signUp',
    ...operationOptions
  })
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
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    baseOptions
  )
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>
export type SignUpMutationResult = ApolloReactCommon.MutationResult<
  SignUpMutation
>
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>
export const MeDocument = gql`
  query Me {
    me {
      ...userFields
    }
  }
  ${UserFieldsFragmentDoc}
`
export type MeComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>,
  'query'
>

export const MeComponent = (props: MeComponentProps) => (
  <ApolloReactComponents.Query<MeQuery, MeQueryVariables>
    query={MeDocument}
    {...props}
  />
)

export type MeProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<MeQuery, MeQueryVariables>
  | TChildProps
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
  })
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
  )
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  )
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>
export const UserDocument = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      createdAt
      updatedAt
      email
      name
      firstName
      lastName
      username
      phoneNumber
      grids {
        id
        createdAt
        updatedAt
        published
        name
        rows
        columns
        gridTemplateColumns
        gridTemplateRows
      }
    }
  }
`
export type UserComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<UserQuery, UserQueryVariables>,
  'query'
> &
  ({ variables: UserQueryVariables; skip?: boolean } | { skip: boolean })

export const UserComponent = (props: UserComponentProps) => (
  <ApolloReactComponents.Query<UserQuery, UserQueryVariables>
    query={UserDocument}
    {...props}
  />
)

export type UserProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<UserQuery, UserQueryVariables>
  | TChildProps
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
  })
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
  )
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
  )
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>
export type UserQueryResult = ApolloReactCommon.QueryResult<
  UserQuery,
  UserQueryVariables
>
export const UsersDocument = gql`
  query Users {
    users {
      id
      email
    }
  }
`
export type UsersComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<UsersQuery, UsersQueryVariables>,
  'query'
>

export const UsersComponent = (props: UsersComponentProps) => (
  <ApolloReactComponents.Query<UsersQuery, UsersQueryVariables>
    query={UsersDocument}
    {...props}
  />
)

export type UsersProps<TChildProps = {}> =
  | ApolloReactHoc.DataProps<UsersQuery, UsersQueryVariables>
  | TChildProps
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
  })
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
  )
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
  )
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>
export type UsersQueryResult = ApolloReactCommon.QueryResult<
  UsersQuery,
  UsersQueryVariables
>
