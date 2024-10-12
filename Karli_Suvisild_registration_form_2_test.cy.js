beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})



describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', ()=>{
        cy.get('#username').type('John01')
        cy.get('#email').type('aurevoir@ipanema.ee')
        cy.get('[data-cy="name"]').type("John")
        cy.get('[data-testid="lastNameTestId"]').type("Smith")
        cy.get('[data-testid="phoneNumberTestId"]').type('8775048423')
        cy.get('#password').type('Qwerty')
        cy.get('#confirm').type('Villamati')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible')
        cy.get('#confirm').clear()
        cy.get('#confirm').type('Qwerty')
        cy.get('h2').contains('Password').click()
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
        
    })
    
    it('User can submit form with all fields added', ()=>{
        cy.get('#username').type('John01')
        cy.get('#email').type('aurevoir@ipanema.ee')
        cy.get('[data-cy="name"]').type("John")
        cy.get('[data-testid="lastNameTestId"]').type("Smith")
        cy.get('[data-testid="phoneNumberTestId"]').type('8775048423')
        cy.get('#cssFavLanguage').check()
        cy.get('#vehicle1').check()
        cy.get('#cars').select('saab')
        cy.get('#animal').select('hippo')
        cy.get('#password').type('Qwerty')
        cy.get('#confirm').type('Qwerty')
        cy.get('h2').contains("Password").click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
       
       })

        });
       
    it('User can submit form with valid data and only mandatory fields added', ()=>{
        inputValidData('John01')
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')

 })

    it('User cannot submit form when email is missing', () => {
        inputValidData('John01')
        cy.get('#email').clear()
        cy.get('h3').contains("Input email").click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible')
        .and('contain.text', 'Mandatory input field is not valid or empty!')
    
 });
    


/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)  

    })

    it('My test for second picture', () => {
        cy.log('Will check logo source and size')
        cy.get('img').eq(1).should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('img').eq(1).invoke('height').should('equal', 88)
        cy.get('img').eq(1).invoke('width').should('equal', 116) 
        
      });
    
    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
        .and('have.attr', 'href', 'registration_form_1.html')
        .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
        
    })

    it('My test for Checking navigation part', () => {
        cy.get('nav').children().eq(1).should('be.visible')
        .and('have.attr', 'href', 'registration_form_3.html')
        .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    
});
   
    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')

    })

    it('Check that check boxes list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text','I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text','I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text','I have a boat')
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    
});

    it('Car dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Favourite animal dropdown is correct', () => {
        cy.get('#animal').select(1).screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
    
});

})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('aurevoir@ipanema.ee')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Smith')
    cy.get('[data-testid="phoneNumberTestId"]').type('8775048423')
    cy.get('#password').type('Qwerty')
    cy.get('#confirm').type('Qwerty')
    cy.get('h2').contains('Password').click()
}