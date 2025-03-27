import React, { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY; 

const RandomContent = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [bannedUrls, setBannedUrls] = useState(() => {
    return JSON.parse(localStorage.getItem("bannedUrls")) || [];
  });
  const [customUrls, setCustomUrls] = useState(() => {
    return JSON.parse(localStorage.getItem("customUrls")) || [];
  });
  const [newUrl, setNewUrl] = useState("");

  // Default websites
  const defaultUrls = [
    "https://www.wikipedia.org/",
    "https://www.nationalgeographic.com/",
    "https://www.space.com/",
    "https://www.bbc.com/",
    "https://www.artstation.com/"
  ];

  // Combine default and user-added URLs
  const allUrls = [...defaultUrls, ...customUrls];

  // Save data to localStorage whenever the banned list or custom URLs change
  useEffect(() => {
    localStorage.setItem("bannedUrls", JSON.stringify(bannedUrls));
  }, [bannedUrls]);

  useEffect(() => {
    localStorage.setItem("customUrls", JSON.stringify(customUrls));
  }, [customUrls]);

  // Fetch a random website screenshot (excluding banned ones)
  const fetchRandomSite = async () => {
    const availableUrls = allUrls.filter(url => !bannedUrls.includes(url));

    if (availableUrls.length === 0) {
      alert("No more available sites! Unban some to continue.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableUrls.length);
    const randomSite = availableUrls[randomIndex];

    const apiUrl = `https://api.apiflash.com/v1/urltoimage?access_key=${API_KEY}&url=${encodeURIComponent(randomSite)}`;

    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        setImageUrl(apiUrl);
        setCurrentUrl(randomSite);
      } else {
        console.error("Error fetching screenshot");
      }
    } catch (error) {
      console.error("API request failed", error);
    }
  };

  // Ban the current site
  const banCurrentSite = () => {
    if (currentUrl && !bannedUrls.includes(currentUrl)) {
      setBannedUrls([...bannedUrls, currentUrl]);
    }
  };

  // Unban a site
  const unbanSite = (url) => {
    setBannedUrls(bannedUrls.filter(banned => banned !== url));
  };

  // Add a custom URL
  const addCustomUrl = () => {
    if (newUrl && !customUrls.includes(newUrl) && !defaultUrls.includes(newUrl)) {
      setCustomUrls([...customUrls, newUrl]);
      setNewUrl("");
    }
  };

  return (
    <div>
      <button onClick={fetchRandomSite}>Discover Something New!</button>
      
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Random Website Screenshot" style={{ width: "100%", marginTop: "10px" }} />
          <p>{currentUrl}</p>
          <button onClick={banCurrentSite}>Ban This Site</button>
        </div>
      )}
      
      <h3>Add a Custom URL</h3>
      <input
        type="text"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        placeholder="Enter a website URL"
      />
      <button onClick={addCustomUrl}>Add URL</button>

      <h3>Banned Sites</h3>
      <ul>
        {bannedUrls.map((url, index) => (
          <li key={index}>
            {url} <button onClick={() => unbanSite(url)}>Unban</button>
          </li>
        ))}
      </ul>
      
      <h3>Custom Added Sites</h3>
      <ul>
        {customUrls.map((url, index) => (
          <li key={index}>{url}</li>
        ))}
      </ul>
    </div>
  );
};

export default RandomContent;
