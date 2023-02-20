const listHelper = require('../utils/list_helper')

describe("Dummy", () => {
    test("dummy returns 1", () => {
        const blogs = []
        const result = listHelper.dummy(blogs)

        expect(result).toBe(1)
    })
})

describe("Total Likes", () => {
    test("of empty list is zero", () => {
        const blogs = []

        const result = listHelper.totalLikes(blogs)
        
        expect(result).toBe(0)
    })

    test("when list has only one blog equals the likes of that", () => {
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5
            }
        ]

        const result = listHelper.totalLikes(blogs)
        
        expect(result).toBe(5)
    })

    test("of a bigger list is calcualted right", () => {
        const blogs = [
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5
            },
            {
                _id: '5a422aa71b54a676234d17f8',
                title: 'Go To Statement Considered Harmful',
                author: 'Edsger W. Dijkstra',
                url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
                likes: 5
            }
        ]

        const result = listHelper.totalLikes(blogs)
        
        expect(result).toBe(15)
    })
})