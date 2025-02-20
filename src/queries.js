import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
      born
      id
      bookCount
    }
    id
    genres
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $authorName: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      authorName: $authorName
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const SET_AUTHOR_BIRTHYEAR = gql`
  mutation changeYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
      bookCount
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
