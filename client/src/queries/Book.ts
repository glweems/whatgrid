import gql from 'graphql-tag';

const BOOK = gql`
  query Book {
    book
  }
`;

export default BOOK;
