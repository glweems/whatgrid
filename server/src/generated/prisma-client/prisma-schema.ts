// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateGrid {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

type Grid {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  name: String
  rows: Int
  columns: Int
  gridTemplateColumns: String
  gridTemplateRows: String
  author: User!
}

type GridConnection {
  pageInfo: PageInfo!
  edges: [GridEdge]!
  aggregate: AggregateGrid!
}

input GridCreateInput {
  id: ID
  published: Boolean
  name: String
  rows: Int
  columns: Int
  gridTemplateColumns: String
  gridTemplateRows: String
  author: UserCreateOneWithoutGridsInput!
}

input GridCreateManyWithoutAuthorInput {
  create: [GridCreateWithoutAuthorInput!]
  connect: [GridWhereUniqueInput!]
}

input GridCreateWithoutAuthorInput {
  id: ID
  published: Boolean
  name: String
  rows: Int
  columns: Int
  gridTemplateColumns: String
  gridTemplateRows: String
}

type GridEdge {
  node: Grid!
  cursor: String!
}

enum GridOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  published_ASC
  published_DESC
  name_ASC
  name_DESC
  rows_ASC
  rows_DESC
  columns_ASC
  columns_DESC
  gridTemplateColumns_ASC
  gridTemplateColumns_DESC
  gridTemplateRows_ASC
  gridTemplateRows_DESC
}

type GridPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  name: String
  rows: Int
  columns: Int
  gridTemplateColumns: String
  gridTemplateRows: String
}

input GridScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  published: Boolean
  published_not: Boolean
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  rows: Int
  rows_not: Int
  rows_in: [Int!]
  rows_not_in: [Int!]
  rows_lt: Int
  rows_lte: Int
  rows_gt: Int
  rows_gte: Int
  columns: Int
  columns_not: Int
  columns_in: [Int!]
  columns_not_in: [Int!]
  columns_lt: Int
  columns_lte: Int
  columns_gt: Int
  columns_gte: Int
  gridTemplateColumns: String
  gridTemplateColumns_not: String
  gridTemplateColumns_in: [String!]
  gridTemplateColumns_not_in: [String!]
  gridTemplateColumns_lt: String
  gridTemplateColumns_lte: String
  gridTemplateColumns_gt: String
  gridTemplateColumns_gte: String
  gridTemplateColumns_contains: String
  gridTemplateColumns_not_contains: String
  gridTemplateColumns_starts_with: String
  gridTemplateColumns_not_starts_with: String
  gridTemplateColumns_ends_with: String
  gridTemplateColumns_not_ends_with: String
  gridTemplateRows: String
  gridTemplateRows_not: String
  gridTemplateRows_in: [String!]
  gridTemplateRows_not_in: [String!]
  gridTemplateRows_lt: String
  gridTemplateRows_lte: String
  gridTemplateRows_gt: String
  gridTemplateRows_gte: String
  gridTemplateRows_contains: String
  gridTemplateRows_not_contains: String
  gridTemplateRows_starts_with: String
  gridTemplateRows_not_starts_with: String
  gridTemplateRows_ends_with: String
  gridTemplateRows_not_ends_with: String
  AND: [GridScalarWhereInput!]
  OR: [GridScalarWhereInput!]
  NOT: [GridScalarWhereInput!]
}

type GridSubscriptionPayload {
  mutation: MutationType!
  node: Grid
  updatedFields: [String!]
  previousValues: GridPreviousValues
}

input GridSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: GridWhereInput
  AND: [GridSubscriptionWhereInput!]
  OR: [GridSubscriptionWhereInput!]
  NOT: [GridSubscriptionWhereInput!]
}

input GridUpdateInput {
  published: Boolean
  name: String
  rows: Int
  columns: Int
  gridTemplateColumns: String
  gridTemplateRows: String
  author: UserUpdateOneRequiredWithoutGridsInput
}

input GridUpdateManyDataInput {
  published: Boolean
  name: String
  rows: Int
  columns: Int
  gridTemplateColumns: String
  gridTemplateRows: String
}

input GridUpdateManyMutationInput {
  published: Boolean
  name: String
  rows: Int
  columns: Int
  gridTemplateColumns: String
  gridTemplateRows: String
}

input GridUpdateManyWithoutAuthorInput {
  create: [GridCreateWithoutAuthorInput!]
  delete: [GridWhereUniqueInput!]
  connect: [GridWhereUniqueInput!]
  set: [GridWhereUniqueInput!]
  disconnect: [GridWhereUniqueInput!]
  update: [GridUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [GridUpsertWithWhereUniqueWithoutAuthorInput!]
  deleteMany: [GridScalarWhereInput!]
  updateMany: [GridUpdateManyWithWhereNestedInput!]
}

input GridUpdateManyWithWhereNestedInput {
  where: GridScalarWhereInput!
  data: GridUpdateManyDataInput!
}

input GridUpdateWithoutAuthorDataInput {
  published: Boolean
  name: String
  rows: Int
  columns: Int
  gridTemplateColumns: String
  gridTemplateRows: String
}

input GridUpdateWithWhereUniqueWithoutAuthorInput {
  where: GridWhereUniqueInput!
  data: GridUpdateWithoutAuthorDataInput!
}

input GridUpsertWithWhereUniqueWithoutAuthorInput {
  where: GridWhereUniqueInput!
  update: GridUpdateWithoutAuthorDataInput!
  create: GridCreateWithoutAuthorInput!
}

input GridWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  published: Boolean
  published_not: Boolean
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  rows: Int
  rows_not: Int
  rows_in: [Int!]
  rows_not_in: [Int!]
  rows_lt: Int
  rows_lte: Int
  rows_gt: Int
  rows_gte: Int
  columns: Int
  columns_not: Int
  columns_in: [Int!]
  columns_not_in: [Int!]
  columns_lt: Int
  columns_lte: Int
  columns_gt: Int
  columns_gte: Int
  gridTemplateColumns: String
  gridTemplateColumns_not: String
  gridTemplateColumns_in: [String!]
  gridTemplateColumns_not_in: [String!]
  gridTemplateColumns_lt: String
  gridTemplateColumns_lte: String
  gridTemplateColumns_gt: String
  gridTemplateColumns_gte: String
  gridTemplateColumns_contains: String
  gridTemplateColumns_not_contains: String
  gridTemplateColumns_starts_with: String
  gridTemplateColumns_not_starts_with: String
  gridTemplateColumns_ends_with: String
  gridTemplateColumns_not_ends_with: String
  gridTemplateRows: String
  gridTemplateRows_not: String
  gridTemplateRows_in: [String!]
  gridTemplateRows_not_in: [String!]
  gridTemplateRows_lt: String
  gridTemplateRows_lte: String
  gridTemplateRows_gt: String
  gridTemplateRows_gte: String
  gridTemplateRows_contains: String
  gridTemplateRows_not_contains: String
  gridTemplateRows_starts_with: String
  gridTemplateRows_not_starts_with: String
  gridTemplateRows_ends_with: String
  gridTemplateRows_not_ends_with: String
  author: UserWhereInput
  AND: [GridWhereInput!]
  OR: [GridWhereInput!]
  NOT: [GridWhereInput!]
}

input GridWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createGrid(data: GridCreateInput!): Grid!
  updateGrid(data: GridUpdateInput!, where: GridWhereUniqueInput!): Grid
  updateManyGrids(data: GridUpdateManyMutationInput!, where: GridWhereInput): BatchPayload!
  upsertGrid(where: GridWhereUniqueInput!, create: GridCreateInput!, update: GridUpdateInput!): Grid!
  deleteGrid(where: GridWhereUniqueInput!): Grid
  deleteManyGrids(where: GridWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  grid(where: GridWhereUniqueInput!): Grid
  grids(where: GridWhereInput, orderBy: GridOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Grid]!
  gridsConnection(where: GridWhereInput, orderBy: GridOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): GridConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  grid(where: GridSubscriptionWhereInput): GridSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  password: String!
  firstName: String
  lastName: String
  username: String
  phoneNumber: Int
  grids(where: GridWhereInput, orderBy: GridOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Grid!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  email: String!
  password: String!
  firstName: String
  lastName: String
  username: String
  phoneNumber: Int
  grids: GridCreateManyWithoutAuthorInput
}

input UserCreateOneWithoutGridsInput {
  create: UserCreateWithoutGridsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutGridsInput {
  id: ID
  email: String!
  password: String!
  firstName: String
  lastName: String
  username: String
  phoneNumber: Int
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  username_ASC
  username_DESC
  phoneNumber_ASC
  phoneNumber_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  email: String!
  password: String!
  firstName: String
  lastName: String
  username: String
  phoneNumber: Int
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  email: String
  password: String
  firstName: String
  lastName: String
  username: String
  phoneNumber: Int
  grids: GridUpdateManyWithoutAuthorInput
}

input UserUpdateManyMutationInput {
  email: String
  password: String
  firstName: String
  lastName: String
  username: String
  phoneNumber: Int
}

input UserUpdateOneRequiredWithoutGridsInput {
  create: UserCreateWithoutGridsInput
  update: UserUpdateWithoutGridsDataInput
  upsert: UserUpsertWithoutGridsInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutGridsDataInput {
  email: String
  password: String
  firstName: String
  lastName: String
  username: String
  phoneNumber: Int
}

input UserUpsertWithoutGridsInput {
  update: UserUpdateWithoutGridsDataInput!
  create: UserCreateWithoutGridsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  phoneNumber: Int
  phoneNumber_not: Int
  phoneNumber_in: [Int!]
  phoneNumber_not_in: [Int!]
  phoneNumber_lt: Int
  phoneNumber_lte: Int
  phoneNumber_gt: Int
  phoneNumber_gte: Int
  grids_every: GridWhereInput
  grids_some: GridWhereInput
  grids_none: GridWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`