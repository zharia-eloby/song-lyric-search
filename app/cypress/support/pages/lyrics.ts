class Lyrics {
  url: string;
  content: string;
  songTitle: string;
  artistName: string;
  lyrics: string;
  topBackLink: string;
  bottomBackLink: string;

  constructor() {
    this.url = '/lyrics'

    this.content = '[data-testid="lyrics-page"]';

    this.songTitle = '[data-testid="song-title"]';
    this.artistName = '[data-testid="artist-name"]';
    this.lyrics = '[data-testid="lyrics"]';

    this.topBackLink = '[data-testid="back-to-home-link-top"]';
    this.bottomBackLink = '[data-testid="back-to-home-link-bottom"]';
  }
}

export default new Lyrics();