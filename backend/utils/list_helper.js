const dummy = (blogs) => {
    return 1
}

const totalLikes = (posts) => {
    const likes = []
    posts.forEach(post => likes.push(post.likes))
    
    const reducer = (sum, item) => {
        return sum + item
    }
    
    return likes.reduce(reducer, 0) === 0 ? 0 : likes.reduce(reducer, 0)
}

module.exports = { dummy, totalLikes }