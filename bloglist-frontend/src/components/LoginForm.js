const LoginForm = ( {handleFunction, setUsername, setPassword} ) => (
    <div>
        <h2>Log in to application</h2>
        <div>
            <form onSubmit={handleFunction}>
                <div>
                    username: <input onChange={({ target }) => setUsername(target.value)}></input>
                </div>
                <div>
                    password: <input onChange={({ target }) => setPassword(target.value)}></input>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    </div>
)

export default LoginForm