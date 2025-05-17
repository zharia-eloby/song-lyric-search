import logA11yViolations from "../support/a11y"
import error404 from "../support/pages/error404"
import home from "../support/pages/home"

beforeEach(() => {
    cy.visit(error404.url)
    cy.get(error404.content).should('be.visible')
})

describe("404 Error Page", () => {
    it('has no a11y violations', () => {
        cy.injectAxe()
        cy.checkA11y(null, null, logA11yViolations)
    })

    context('when the home link is selected', () => {
        it('directs to the home page', () => {
            cy.get(error404.homeLink).click()
            cy.get(home.content).should('be.visible')
        })
    })
})