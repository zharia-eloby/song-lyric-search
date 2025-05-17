import home from '../support/pages/home';
import lyrics from '../support/pages/lyrics';

beforeEach(() => {
  cy.visit(home.url)
})

describe('Home Page', () => {
  context('When user searches for song lyrics', () => {
    context('with valid input', () => {
      it('directs to the lyrics page', () => {
        cy.intercept('GET', 'https://api.lyrics.ovh/v1/**', { 
          statusCode: 200,
          body: { 
            status: 200, 
            lyrics: "these are the lyrics for testing purposes" 
          }
        }).as('lyricsResponse')

        cy.get(home.artistInputField).type('Etta James')
        cy.get(home.songTitleInputField).type('At Last')
        cy.get(home.submitButton).click()
        cy.wait('@lyricsResponse')

        cy.get(lyrics.songTitle)
          .should('be.visible')
          .contains('At Last')
        cy.get(lyrics.artistName)
          .should('be.visible')
          .contains('Etta James')
        cy.get(lyrics.lyrics)
          .should('be.visible')
          .contains('these are the lyrics for testing purposes')
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

      it('when the song is not found', () => {
        cy.get(home.artistInputField).type('somerandomartistinputfortesting')
        cy.get(home.songTitleInputField).type('somerandomsongtitleinputfortesting')
        cy.get(home.submitButton).click()
        cy.get(home.notFoundError).should('be.visible')
      })

      it('when encountering an api error', () => {
        cy.intercept('GET', 'https://api.lyrics.ovh/v1/**', { 
          statusCode: 500,
          body: { status: 500 }
        }).as('apiErrorResponse')

        cy.get(home.artistInputField).type('Etta James')
        cy.get(home.songTitleInputField).type('At Last')
        cy.get(home.submitButton).click()
        cy.wait('@apiErrorResponse')

        cy.get(home.apiError).should('be.visible')
      })
    })
  })
})