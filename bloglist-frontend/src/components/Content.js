import BlogForm from './BlogForm'
import LogoutButton from "./LogoutButton"
import Blog from "./Blog"

const Content = ( {user, logoutServiceLogout, handleBlogAdd, setTitle, setAuthor, setUrl, blogs} ) => {
    const blogsToShow = Array.from(blogs)
    
    const contentToShow =
        <div>
        <h2>Blogs</h2>
        {user.username} logged in <LogoutButton onClick={logoutServiceLogout}/>

        <BlogForm handleFunction={handleBlogAdd} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl}/>

        {blogsToShow.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
    
    return contentToShow
}

export default Content