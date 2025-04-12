// Add layout to the page to see a 'home button' on every page
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li className="home-link" key="home-button">
                        <Link style={{ color: "white" }} to="/">
                            Home
                        </Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
};

export default Layout;
