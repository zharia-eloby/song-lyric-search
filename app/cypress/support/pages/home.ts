class Home {
  url: string;
  artistInputField: string;
  songTitleInputField: string;
  submitButton: string;
  artistInvalidError: string;
  songTitleInvalidError: string;
  apiError: string;
  notFoundError: string;

  constructor() {
    this.url = '/';

    // form
    this.artistInputField = '[data-testid="artist-input-field"]';
    this.songTitleInputField = '[data-testid="song-title-input-field"]';
    this.submitButton = '[data-testid="submit-button"]';

    // error messages
    this.artistInvalidError = '[data-testid="artist-input-invalid"]';
    this.songTitleInvalidError = '[data-testid="song-title-input-invalid"]';
    this.apiError = '[data-testid="api-error"]';
    this.notFoundError = '[data-testid="not-found-error"]';
  }
}

export default new Home();