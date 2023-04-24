const logout = async (request, response) => {
    console.log("Clearing LoggedBloglistuser from window.localStorage")
    window.localStorage.clear("LoggedBloglistUser")
}

export default { logout }