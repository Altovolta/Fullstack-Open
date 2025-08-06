const lodash = require('lodash')

const dummy = (blogs) => {
    console.log(blogs)
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    return blogs.reduce((favourite, blog) => {
        return (favourite.likes || 0) < blog.likes ? blog : favourite
    }, {})
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) return null


    const authorBlogsCount = lodash.countBy(blogs, 'author')
    const mostBlogs = lodash.reduce(authorBlogsCount, (result, count, author) => {
        return count >= result.blogs ? { author, blogs: count } : result
    }, { author: null, blogs: 0 })

    return mostBlogs
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}