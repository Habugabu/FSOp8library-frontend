import { gql } from "@apollo/client";

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
  }
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
      title
      published
      author {
        name
        born
        id
        bookCount
      }
      genres
      id
    }
  }
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
