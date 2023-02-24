Cypress.Commands.add('login', ({username, password}) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
      username: 'Cypress Tester', password: 'CypressIsTheBestTester'
    }).then(response => {
      localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
      cy.visit('')
    })
})

describe('Bloglist', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Cypress Testing',
      username: 'Cypress Tester',
      password: 'CypressIsTheBestTester'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user) 
    cy.visit('')
  })

  describe("on visit", function() {
    it('front page can be opened', function() {
      cy.contains('Bloglist')
    })

    it('login form can be opened and logged into', function() {
      cy.contains('login').click()
      cy.get('#username').type('Cypress Tester')
      cy.get('#password').type('CypressIsTheBestTester')
      cy.get('#login-button').click()
      cy.contains('Cypress Tester logged in')
    })

    it('logins can be unsuccessful', function() {
      cy.contains('login').click()
      cy.get('#username').type('Cypress Tester')
      cy.get('#password').type('CypressIsTheWorstTester')
      cy.get('#login-button').click()
      cy.get('.notif').should('contain','Failed to login as Cypress Tester')
        .and('have.css','color', 'rgb(255, 0, 0)')
        cy.contains('Cypress Tester logged in').should('not.exist')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({username: 'Cypress Tester', password: 'CypressIsTheBestTeacher'})
    })

    it('a new blog can be created', function() {
      cy.contains('add blog').click()
      cy.get("#title").type("A blog created by Cypress")
      cy.get("#author").type("Cypress")
      cy.get("#url").type("Test")
      cy.get('#create-button').click()
      cy.contains("Blog title: A blog created by Cypress - Blog author: Cypress")
    })
  })
})