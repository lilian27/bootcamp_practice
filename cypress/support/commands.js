Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
        username,
        password
    }).then(response => {
        localStorage.setItem(
            'loggedAppUser', JSON.stringify(response.body)
        )
        cy.visit('http://localhost:3001')
    })
    it('', () =>{
        
    })
})