import home from "../support/pages/home";
import lyrics from "../support/pages/lyrics";
import logA11yViolations from "../support/a11y";

beforeEach(() => {
    cy.visit('/')
    cy.get(home.content).should('be.visible')
    cy.get(home.artistInputField).type('Etta James')
    cy.get(home.songTitleInputField).type('At Last')
    cy.get(home.submitButton).click()
    cy.get(lyrics.content).should('be.visible')
})

describe('Lyrics Page', () => {
    it('has no a11y violations', () => {
        cy.injectAxe()
        cy.checkA11y(null, null, logA11yViolations)
    })

    context('User is directed to the home page', () => {
        it('when selecting the top back link', () => {
            cy.get(lyrics.topBackLink).click()
            cy.get(home.content).should('be.visible')
        })

        it('when selecting the bottom back link', () => {
            cy.get(lyrics.bottomBackLink).click()
            cy.get(home.content).should('be.visible')
        })
        
        it('when visiting /lyrics without song data', () => {
            cy.visit('/')
            cy.visit('/lyrics')
            cy.get(home.content).should('be.visible')
        })
    })
})