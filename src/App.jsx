import { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommend from "./components/Recommend";
import { useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByTitle = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery(query, ({ allBooks }) => {
    return { allBooks: uniqByTitle(allBooks.concat(addedBook)) };
  });
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      window.alert(`${addedBook.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  useEffect(() => {
    setPage("authors");
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : null}
        {token ? (
          <div>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </div>
        ) : null}
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} token={token} />

      <Login show={page === "login"} setToken={setToken} />

      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
