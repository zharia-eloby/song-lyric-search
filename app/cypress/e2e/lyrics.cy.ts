import home from "../support/pages/home";
import lyrics from "../support/pages/lyrics";

beforeEach(() => {
    cy.visit('/')
    cy.get(home.content).should('be.visible')
    cy.get(home.artistInputField).type('Etta James')
    cy.get(home.songTitleInputField).type('At Last')
    cy.get(home.submitButton).click()
    cy.get(lyrics.content).should('be.visible')
})

describe('Lyrics Page', () => {
    context('User is directed to the home page', () => {
        it('when selecting the top back link', () => {
            cy.get(lyrics.topBackLink).click()
            cy.get(home.content).should('be.visible')
        })

        it('when selecting the bottom back link', () => {
            cy.get(lyrics.bottomBackLink).click()
            cy.get(home.content).should('be.visible')
        })
    })
})