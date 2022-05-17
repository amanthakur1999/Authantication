import React from 'react';

function LogOut() {
  const handleLogout = async () => {
    await localStorage.clear();
    window.location = '/';
  };

  return (
    <>
      <section>
        <div className="logout">
          <h2>Do you want to logout your Account</h2>
          <button onClick={handleLogout}>LOGOUT</button>
        </div>
      </section>
    </>
  );
}
export default LogOut;
