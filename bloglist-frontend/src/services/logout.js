const logout = async (request, response) => {
    console.log("logging out")
    window.localStorage.clear("LoggedBloglistUser")
    console.log("logged out")
    return window.location.reload()
}

export default { logout }