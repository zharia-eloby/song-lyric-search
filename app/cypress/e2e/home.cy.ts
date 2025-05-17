import home from '../support/pages/home';
import lyrics from '../support/pages/lyrics';

beforeEach(() => {
  cy.visit(home.url)
})

describe('When user searches for song lyrics', () => {
  context('with valid input', () => {
    it('directs to the lyrics page', () => {
      cy.get(home.artistInputField).type('Etta James')
      cy.get(home.songTitleInputField).type('At Last')
      cy.get(home.submitButton).click()
      cy.get(lyrics.lyrics).should('be.visible')
      cy.get(lyrics.artistName)
        .should('be.visible')
        .contains('Etta James')
      cy.get(lyrics.songTitle)
        .should('be.visible')
        .contains('At Last')
    })
  })

  context('an error message is displayed', () => {
    it('when submitting with empty artist input field', () => {
      cy.get(home.songTitleInputField).type('At Last')
      cy.get(home.submitButton).click()
      cy.get(home.artistInvalidError).should('be.visible')
      cy.get(home.songTitleInvalidError).should('not.be.visible')
    })

    it('when submitting with empty song title input field', () => {
      cy.get(home.artistInputField).type('Etta James')
      cy.get(home.submitButton).click()
      cy.get(home.artistInvalidError).should('not.be.visible')
      cy.get(home.songTitleInvalidError).should('be.visible')
    })
  })
})