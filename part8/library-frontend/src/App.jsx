import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient } from "@apollo/client/react";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const storageToken = window.localStorage.getItem('token')
    if (storageToken) {
      setToken(storageToken)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('token')
    setToken(null)
    client.clearStore()
  }

  const showLoggedFeatures = () => {
    return (
      <>
      <button onClick={() => setPage("add")}>add book</button> 
      <button onClick={logout}>logout</button>
      </>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token 
        ? <button onClick={() => setPage("login")}>login</button> 
        : showLoggedFeatures()
        }
      </div>

      <Login 
        show={page === "login"} 
        setToken={setToken} 
        setPage={setPage}
      />
      <Authors show={page === "authors"} user={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
