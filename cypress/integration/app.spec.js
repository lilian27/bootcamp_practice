describe('Note app', function () {

    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })

    it('login form can be opened', function () {
        cy.contains('log in').click()
    })

    it('user can log in', function () {
        cy.contains('log in').click()
        cy.get('#username').type('root')
        cy.get('#password').type('lilian')
        cy.get('#login-button').click()

        cy.contains('Bienvenid@: root hot')
    })

    


})

