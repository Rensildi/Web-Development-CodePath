import React from 'react';

function Header({ title, description, totalCards }) {
  return (
    <div className="header">
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Total cards: {totalCards}</p>
    </div>
  );
}

export default Header;
