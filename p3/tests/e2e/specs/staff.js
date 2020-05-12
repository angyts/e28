// https://docs.cypress.io/api/introduction/api.html

describe('Testing the staff page for manager use', () => {
  it('Visits the staff url', () => {
    cy.visit('/employee');
    cy.get('[data-test="managerviewforstaff"]').should('exist');
  })
})

describe('Test Adding and deleting staff', () => {
    let staff = {
        name: "the test staff name and nickname",
        slug: "teststaff"
    }

  it('Should add a staff', () => {
      cy.get('#staffname').type(staff.name);
      cy.get('#staffslug').type(staff.slug);
      cy.get('[data-test=submitbtn]').click();
      cy.contains('div', `${staff.name} have been added`);
  })

  it('Should delete a staff', () => {
      cy.get(`[data-test=${staff.slug}]`).click();
      cy.get('[data-test=deleteEmployeebutton]').click();
      cy.contains('div', 'Staff successfully deleted').should('exist');
  })
})