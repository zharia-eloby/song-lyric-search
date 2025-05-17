class Lyrics {
  songTitle: string;
  artistName: string;
  lyrics: string;

  constructor() {
    this.songTitle = '[data-testid="song-title"]';
    this.artistName = '[data-testid="artist-name"]';
    this.lyrics = '[data-testid="lyrics"]';
  }
}

export default new Lyrics();