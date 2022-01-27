describe('Note app', function () {

    beforeEach(function () {
        cy.visit('http://localhost:3001')

        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        
        const user = {
            username: 'admin',
            name: 'Administrador de Sistema',
            password: 'admin'
        }
        // request usa axios
        cy.request('POST', 'http://localhost:3001/api/users', user)
    })

    it('login form can be opened', function () {
        cy.contains('Iniciar Sessión').click()
    })

    it('user can log in', () => {
        cy.contains('Iniciar Sessión').click()
        cy.get('#username').type('root')
        cy.get('#password').type('lilian')
        cy.get('#login-button').click()
        cy.contains('root hot')
    })

    it('login fails with wrong password', () =>{
        cy.contains('Iniciar Sessión').click()
        cy.get('#username').type('admin2')
        cy.get('#password').type('lilian')
        cy.get('#login-button').click()
        cy.get('.error')
            .should('contain','Wrong credentials')
    })

    describe('when logged in ws', () =>{
        beforeEach( () =>{
            cy.login({username: 'root', password:'lilian' })
        })

        /*
        it('a new note can be created', () =>{

        })
        */
    })
    
})

