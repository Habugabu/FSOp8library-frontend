import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, SET_AUTHOR_BIRTHYEAR } from "../queries";

const UpdateAuthor = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [changeYear] = useMutation(SET_AUTHOR_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    changeYear({
      variables: { name, born: parseInt(born) },
    });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default UpdateAuthor;
