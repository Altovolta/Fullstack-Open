import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import { useApolloClient, useQuery, useSubscription } from "@apollo/client/react";
import Recomendations from "./components/Recommendations";
import { BOOK_ADDED, GET_USER_INFO, ALL_BOOKS } from "./queries";
import { updateBooksCache } from "./helpers/updateCache";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client}) => {
      const addedBook = data.data.bookAdded
      window.alert(`Book ${addedBook.title} added`)
      updateBooksCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })
  
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

  if (userInfoResult.loading || ! userInfoResult.data.me) {
    return <div> Loading ...</div>
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
