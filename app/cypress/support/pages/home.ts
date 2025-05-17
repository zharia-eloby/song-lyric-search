class Home {
  artistInputField: string;
  songTitleInputField: string;
  submitButton: string;
  artistInvalidError: string;
  songTitleInvalidError: string;
  url: string;

  constructor() {
    this.url = '/';

    // form
    this.artistInputField = '[data-testid="artist-input-field"]';
    this.songTitleInputField = '[data-testid="song-title-input-field"]';
    this.submitButton = '[data-testid="submit-button"]';

    // error messages
    this.artistInvalidError = '[data-testid="artist-input-invalid"]';
    this.songTitleInvalidError = '[data-testid="song-title-input-invalid"]';
  }
}

export default new Home();