import { Link } from "react-router";

function Error404() {
  return (
    <main role="main" id="error-page-message" className="text-center px-3" data-testid="error-404-page">
      <h1>Page not found</h1>
      <Link className="fs-4" to="/" data-testid="home-link">Go to homepage</Link>
    </main>
  );
}

export default Error404;