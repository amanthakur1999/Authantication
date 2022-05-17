import React from 'react';
import { Link } from 'react-router-dom';
function User() {
  return (
    <>
      <section className="container">
        <div className="user">
          <h2>Welcome to Authentication Application</h2>
          <h3>
            Please <Link to="/signup">SignUp</Link> &&{' '}
            <Link to="/login">LogIn</Link>
          </h3>
        </div>
      </section>
    </>
  );
}
export default User;
