
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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}