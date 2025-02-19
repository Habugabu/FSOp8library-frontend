import { useQuery } from "@apollo/client";
import { useState } from "react";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);

  const [genreFilter, setGenreFilter] = useState("");

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = [...result.data.allBooks];

  let genres = [];

  books.forEach((b) => (genres = genres.concat(b.genres)));

  genres = [...new Set(genres)];

  const filteredBooks = books.filter((b) => b.genres.includes(genreFilter));

  let shownBooks = [];

  if (filteredBooks.length === 0) {
    shownBooks = books;
  } else {
    shownBooks = filteredBooks;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {shownBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <select
        value={genreFilter}
        onChange={({ target }) => setGenreFilter(target.value)}
      >
        <option>(select a genre)</option>
        {genres.map((a) => (
          <option key={a}>{a}</option>
        ))}
      </select>
    </div>
  );
};

export default Books;
