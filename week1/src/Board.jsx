import React, { useState } from "react";
import Card from "./Card";

const Board = () => {
  const [resources, setResources] = useState([
    { title: "React Docs", description: "Learn React from official docs.", link: "https://react.dev/" },
    { title: "JavaScript Info", description: "Deep dive into JavaScript.", link: "https://javascript.info/" }
  ]);

  return (
    <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((res, index) => (
        <Card key={index} {...res} />
      ))}
    </div>
  );
};

export default Board;
