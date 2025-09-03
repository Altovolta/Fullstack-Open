import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient, useQuery } from "@apollo/client/react";
import Recomendations from "./components/Recommendations";
import { GET_USER_INFO } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const userInfoResult = useQuery(GET_USER_INFO)

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

  if (userInfoResult.loading) {
    return <div>Loading ...</div>
  }

  const userInfo = userInfoResult.data.me

  if( !token ) {
    return (
      <>
        <div>
          <button onClick={() => setPage("authors")}>authors</button>
          <button onClick={() => setPage("books")}>books</button>
          <button onClick={() => setPage("login")}>login</button> 
        </div>
        <div>
          <Login 
            show={page === "login"} 
            setToken={setToken} 
            setPage={setPage}
          />
          <Authors show={page === "authors"} user={token} />
          <Books show={page === "books"} />
        </div>
      </>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button> 
        <button onClick={() => setPage("recommend")}>recommend</button> 
        <button onClick={logout}>logout</button>
      </div>

      <Login 
        show={page === "login"} 
        setToken={setToken} 
        setPage={setPage}
      />
      <Authors show={page === "authors"} user={token} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recomendations 
        show={page === "recommend"} 
        genre={userInfo.favoriteGenre}
      />
    </div>
  );
};

export default App;
