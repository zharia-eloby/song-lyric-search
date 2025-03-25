import { Outlet } from "react-router-dom";

function Header() {
    return (
        <>
            <p>This is the header</p>
        </>
    );
}

function Footer() {
    return (
        <>
            <p>This is the footer</p>
        </>
    );
}

function BaseLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default BaseLayout;