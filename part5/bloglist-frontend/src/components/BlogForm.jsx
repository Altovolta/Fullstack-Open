const BlogForm = ({
    handleNewBlog,
    title,
    setTitle,
    author,
    setAuthor,
    url,
    setUrl
}) => {
    return (
      <div>
        <form onSubmit={handleNewBlog}>
          <div>
            title: {' '} 
            <input 
            type='text' 
            value={title} 
            onChange={({target}) => setTitle(target.value)}
            name='Title'/>
          </div>
          <div>
            author:{' '}  
            <input 
            type='text' 
            value={author} 
            onChange={({target}) => setAuthor(target.value)}
            name='Author'/>
          </div>
          <div>
            url: {' '}   
            <input 
            type='text' 
            value={url} 
            onChange={({target}) => setUrl(target.value)}
            name='Url'/>
          </div>
          <div>
            <button type='submit'>create</button>
          </div>
          
        </form>
      </div>
    )
}

export default BlogForm