export const updateBooksCache = (cache, query, addedBook) => {
    const uniqByName = (addedBook) => {
    let seen = new Set()
    return addedBook.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}
