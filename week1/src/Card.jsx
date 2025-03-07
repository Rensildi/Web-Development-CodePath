import React from "react";

const Card = ({ title, description, link }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">{title}</h2>
      <p>{description}</p>
      {link && <a href={link} className="text-blue-500">Learn More</a>}
    </div>
  );
};

export default Card;
