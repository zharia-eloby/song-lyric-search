class Error404 {
  url: string;
  content: string;
  homeLink: string;

  constructor() {
    this.url = '/foo';

    this.content = '[data-testid="error-404-page"]';

    this.homeLink = '[data-testid="home-link"]';
  }
}

export default new Error404();