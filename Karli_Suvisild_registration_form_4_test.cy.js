beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Assignement 6: analyze and fix failed test
describe('Input fields', () => {
    it('Username cannot be empty string', () => {
        cy.get('#username').type('John01')
        cy.get('h2').contains('Password').click()
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#success_message').should('not.be.visible')
    })

    it('Username tooltip is visible', () => {
        cy.get('#username').type('{enter}')
        cy.get('h2').contains('Password').click()
        cy.get('#username').should('have.attr', 'title').should('contain', 'Please add username')
        cy.get('#username').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
    })

    it('Username should have min and max length values 1 and 50 characters', () => {
        cy.get('#username').should('have.attr', 'min', '1')
        cy.get('#username').should('have.attr', 'max', '50')
    })

    it('Username should support only letters and numbers', () => {
        cy.get('#username').should('have.attr', 'pattern', '[a-zA-Z0-9_]+')
    })

    it('Email input should support correct pattern', () => {
        cy.get('#email').should('have.attr', 'pattern').should('contain', '[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,4}$')
        cy.get('#email').type('invalid')
        cy.get('h2').contains('Password').click()
        cy.get('#email').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
        cy.get('.submit_button').should('not.be.enabled');
    })

    it('User cannot submit empty registration form', () => {
        cy.get('.submit_button').should('be.disabled')

    })

    it('BMW should not be listed in the list of the cars', () => {
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').children().eq(0).should('have.text', 'Volvo')
        cy.get('#cars').children().eq(1).should('have.text', 'Saab')
        cy.get('#cars').children().eq(2).should('have.text', 'Opel')
        cy.get('#cars').children().eq(3).should('have.text', 'Audi')
    })
})