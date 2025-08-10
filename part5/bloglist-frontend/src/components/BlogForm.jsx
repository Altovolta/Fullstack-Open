import { useState } from "react"

const BlogForm = ({
    onNewBlog,
}) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const clearBlogForm = () => {
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        await onNewBlog({title, author, url})
        clearBlogForm()
    }

    return (
      <div>
        <form onSubmit={onSubmit}>
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