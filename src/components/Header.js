import { Link, NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="flex-sb">
            <Link style={{ textDecoration: 'none' }} to="/">
              <h1>Authentication</h1>
            </Link>

            {props.isLoggedIn ? (
              <AuthHeader user={props.user} />
            ) : (
              <NonAuthHeader />
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

function NonAuthHeader() {
  return (
    <ul className="flex">
      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/signup"
      >
        <li className="button">Signup</li>
      </NavLink>
      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/login"
      >
        <li className="button">Login</li>
      </NavLink>
    </ul>
  );
}
function AuthHeader(props) {
  // let { username } = props.user;
  return (
    <ul className="flex">
      <NavLink
        style={{ textDecoration: 'none' }}
        activeclassname="active"
        to="/logout"
      >
        <li className="button">Logout</li>
      </NavLink>
    </ul>
  );
}

export default Header;
