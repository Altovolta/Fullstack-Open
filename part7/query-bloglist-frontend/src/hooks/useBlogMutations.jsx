import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from './useNotification'
import blogService from '../services/blogs'

export const useBlogMutations = () => {
  const queryClient = useQueryClient()
  const notifyWith = useNotification()

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      )
      updatedBlogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
      queryClient.setQueryData(['blogs'], updatedBlogs)
      notifyWith({ message: 'Te gusto esa eh...', isError: false })
    },
    onError: (err) => {
      const message = err.response.data.error
      notifyWith({ message, isError: true })
    },
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, { id }) => {
      const blogs = queryClient.getQueryData(['blogs'])
      const deletedBlog = blogs.find((blog) => blog.id === id)
      const filteredBlogs = blogs.filter((blog) => blog.id !== id)

      queryClient.setQueryData(['blogs'], filteredBlogs)

      const message = `Blog '${deletedBlog.title}' deleted`
      notifyWith({ message, isError: false })
    },
    onError: (err) => {
      const message = err.response.data.error
      notifyWith({ message, isError: true })
    },
  })

  return { likeBlogMutation, removeBlogMutation }
}
