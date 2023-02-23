const BlogForm = ( {handleFunction, setTitle, setAuthor, setUrl} ) => (
    <div>
        <form onSubmit={handleFunction}>
            <div>
                title: <input onChange={({ target }) => setTitle(target.value)}></input>
            </div>
            <div>
                author: <input onChange={({ target }) => setAuthor(target.value)}></input>
            </div>
            <div>
                url: <input onChange={({ target }) => setUrl(target.value)}></input>
            </div>
            <button type="submit">create</button>
        </form>
    </div>
)

export default BlogForm