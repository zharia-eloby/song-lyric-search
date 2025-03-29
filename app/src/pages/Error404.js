import { Link } from "react-router-dom";

function Error404() {
    return (
        <div id="error-page-message" className="text-center px-3">
            <h1>Page not found</h1>
            <Link className="fs-4" to="/">Go to homepage</Link>
        </div>
    );
}

export default Error404;