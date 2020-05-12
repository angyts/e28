// https://docs.cypress.io/api/introduction/api.html

describe('Test Mainpage Function', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.get('[data-test="homepageview"]').should('exist');
  })
})

// TODO test navigation and changing of the date

describe('Test Roster Function', () => {
  it('Visits the day view and displays calender and staff', () => {
    cy.visit('/day');
    cy.get('[data-test="dayview"]').should('exist');

    // Confirm calender rendered
    cy.get('[data-test="day-calander"]').should('exist');

    // Employees rendered
    cy.get('[data-test="employeesindayview"]').should('exist');
  })

  it('Is able to add a new shift', () => {
    cy.get('[data-test="add-shift-button-dropdown"]').click();

    // Date picker renders
    cy.get('[data-test="date-picker"]').should('exist');
    // Clock renders
    cy.get('[data-test="time-picker"]').should('exist');
    // Proceed to add a shift
    cy.get('[data-test="add-shift-button-dropdown"]').click();
    // Find the shift that was added TODO not sure how
    cy.get('.v-event-timed.bg-secondary.white--text:first').click().invoke('attr', 'data-test', 'shift-that-was-added');
  })

  it('Is able to schedule a staff to the shift', () => {
    // By clicking on the staff
    // TODO later for drag and drop
    cy.get('.btn.col-xl-6.btn-outline-primary:first').click();
    cy.contains('The following stars are rostered')
  })

  it('Is able to delete a shift', () => {
    // Click on delete
    cy.get('[data-test="deleteshiftbutton"]').click();
    cy.get('[data-test="shift-that-was-added"]').should('not.exist');
  })
})